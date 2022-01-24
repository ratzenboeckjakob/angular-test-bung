package at.htl;

import java.time.LocalDate;

public interface DTO {
    record SessionDateDTO(Integer id, LocalDate date){}
    record SessionSeatDTO(Integer id, Model.Category category, Boolean booked){}
}
