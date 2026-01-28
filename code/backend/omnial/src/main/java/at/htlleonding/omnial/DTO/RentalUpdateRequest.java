package at.htlleonding.omnial.DTO;

import java.util.Date;
import java.util.List;

public class RentalUpdateRequest {
        public int personId;
        public Date leaseDate;
        public Date returnDate;
        public List<Long> equipmentIds;
        public String note;
        public String state;
}
