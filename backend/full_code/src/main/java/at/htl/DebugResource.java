package at.htl;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Path("/debug")
public final class DebugResource {

    private final Data data;

    public DebugResource(Data data) {
        this.data = data;
    }

    @GET
    @Path("everything")
    public Response getEverything(){
        return Response.ok(this.data.getSessions()).build();
    }
}
