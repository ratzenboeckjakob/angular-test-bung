package at.htl;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDate;
import java.util.List;

public interface Model {

    record Person(String firstName, String lastName, LocalDate dob, String city, Integer zip, String street, Integer streetNo, String mail){}
    record Ticket(String id, @JsonIgnore Seat seat, Person person){}
    record Session(Integer id, LocalDate date, String speaker, List<Seat> seats){}

    enum Category {
        VIP,
        SEAT,
        STANDING
    }

    class Seat {
        private final Integer id;
        private final Category category;
        @JsonIgnore
        private final Session session;
        private Ticket ticket;

        public Seat(Integer id, Category category, Session session) {
            this.id = id;
            this.category = category;
            this.session = session;
        }

        public Integer getId() {
            return id;
        }

        public Category getCategory() {
            return category;
        }

        public Session getSession() {
            return session;
        }

        public Ticket getTicket() {
            return ticket;
        }

        public void setTicket(Ticket ticket) {
            this.ticket = ticket;
        }
    }
}