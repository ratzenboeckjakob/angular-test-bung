package at.htl;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Comparator;

@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Path("/reservation")
public final class ReservationResource {

    private final Data data;

    public ReservationResource(Data data) {
        this.data = data;
    }

    @GET
    @Path("session/dates")
    public Response getSessionDates(){
        var dates = this.data.getSessions()
                .stream()
                .map(s -> new DTO.SessionDateDTO(s.id(), s.date()))
                .sorted(Comparator.comparing(DTO.SessionDateDTO::date))
                .toList();
        return Response.ok(dates).build();
    }

    @GET
    @Path("session/{sessionId}/seats")
    public Response getSeatsForSession(@PathParam("sessionId") Integer sessionId){
        var session = this.data.getSessions()
                .stream()
                .filter(s -> s.id().equals(sessionId))
                .findFirst().orElse(null);
        if (session == null){
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        var seats = session.seats()
                .stream()
                .map(s -> new DTO.SessionSeatDTO(s.getId(),
                        s.getCategory(), s.getTicket() != null))
                .toList();
        return Response.ok(seats).build();
    }

    @POST
    @Path("seat/{seatId}/book")
    public Response bookSeat(@PathParam("seatId") Integer seatId, Model.Person person){
        var seat = this.data.getSessions()
                .stream()
                .flatMap(session -> session.seats().stream())
                .filter(s -> s.getId().equals(seatId))
                .findFirst().orElse(null);
        if (seat == null){
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        if (seat.getTicket() != null){
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        var ticket = createTicket(seat, person);
        seat.setTicket(ticket);
        return Response.ok(ticket).build();
    }

    private static Model.Ticket createTicket(Model.Seat seat, Model.Person person){
        var id = String.format("%03d-%d", seat.getSession().id(), seat.getId());
        return new Model.Ticket(id, seat, person);
    }

}
