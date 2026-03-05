package at.htlleonding.omnial.repository;

import at.htlleonding.omnial.model.Reservation;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JSR310Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import jakarta.enterprise.context.ApplicationScoped;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.LinkedList;
import java.util.List;

/**
 * A JSON-based implementation of the Reservation Repository.
 * Data is persisted directly to a local file instead of a relational database.
 */
@ApplicationScoped
public class ReservationRepositoryJSON {

    private ObjectMapper objectMapper = new ObjectMapper();
    private List<Reservation> allReservations = new LinkedList<>();

    /**
     * Constructor: Configures Jackson to handle Java 8 LocalDateTime properly.
     * Disables timestamps to ensure dates are saved in a human-readable ISO format.
     */
    public ReservationRepositoryJSON() {
        // Register modules for Java 8 Date/Time support
        objectMapper.registerModule(new JSR310Module());
        JavaTimeModule javaTimeModule = new JavaTimeModule();

        // Ensure dates are written as Strings (ISO-8601) rather than numeric timestamps
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        // Define specific deserialization format
        javaTimeModule.addDeserializer(LocalDateTime.class,
                new LocalDateTimeDeserializer(DateTimeFormatter.ISO_DATE_TIME));

        objectMapper.registerModule(javaTimeModule);

        // Load existing data into memory on initialization
        allReservations = getAllReservation();
    }

    /**
     * Reads the entire JSON file and converts it into a List of Reservations.
     * @return List of current reservations.
     */
    public List<Reservation> getAllReservation() {
        String jsonReservationsArray = getReservationsFromFile();
        List<Reservation> listReservations = new LinkedList<>();

        try {
            // Use TypeReference to handle generic List type during deserialization
            listReservations = objectMapper.readValue(jsonReservationsArray,
                    new TypeReference<List<Reservation>>() {});
        }
        catch (IOException ex){
            System.err.println("Critical Error: Cannot parse JSON to Reservation List.");
        }

        return listReservations;
    }

    public Reservation getReservationById(int id) {
        // Implementation pending: would typically return from allReservations list
        return null;
    }

    /**
     * Adds a new reservation, validates for time conflicts, and rewrites the JSON file.
     * @throws IllegalArgumentException if the requested time slot is occupied.
     */
    public void addReservation(Reservation reservation) {
        try {
            if(checkReservation(reservation)) {
                allReservations.add(reservation);
            }
            else {
                throw new IllegalArgumentException("Requested time slot is already taken.");
            }
            // Save updated list back to the filesystem
            saveToFile();
        }
        catch (IOException e){
            System.err.println("I/O Error: Could not update the JSON database.");
        }
    }

    /**
     * Removes a reservation by index and updates the file.
     */
    public void deleteReservation(int id){
        try {
            Reservation reservation = allReservations.get(id);
            if (reservation != null){
                allReservations.remove(reservation);
                saveToFile();
            }
        }
        catch (IOException e){
            System.err.println("I/O Error: Could not delete entry from JSON.");
        }
    }

    /**
     * Updates an existing reservation entry in the list and file.
     */
    public void updateReservation(int id, Reservation reservation){
        try {
            Reservation reservationOld = allReservations.get(id);

            if (reservationOld != null){
                allReservations.remove(reservationOld);

                // Update fields
                reservationOld.setReservationDate(reservation.getReservationDate());
                reservationOld.setPerson(reservation.getPerson());
                reservationOld.setRoom(reservation.getRoom());
                reservationOld.setStartTime(reservation.getStartTime());
                reservationOld.setEndTime(reservation.getEndTime());

                allReservations.add(reservationOld);
                saveToFile();
            }
        }
        catch (IOException e){
            System.err.println("I/O Error: Could not update JSON file.");
        }
    }

    /**
     * Utility method to read the raw string content of the JSON file.
     */
    public String getReservationsFromFile(){
        Path filepath = Paths.get("./data/reservations.json");
        try {
            return Files.readString(filepath);
        }
        catch (Exception ex){
            System.err.println("File Error: Could not find or read reservations.json");
            return "[]"; // Return empty array as fallback
        }
    }

    /**
     * Helper to persist the current in-memory list back to disk.
     */
    private void saveToFile() throws IOException {
        objectMapper.writeValue(Paths.get("./data/reservations.json").toFile(), allReservations);
    }

    /**
     * Logic to prevent overlapping bookings.
     * Compares the start/end times of the new reservation against all existing ones.
     * @return true if the slot is free, false if a conflict exists.
     */
    public boolean checkReservation(Reservation reservation){
        for (Reservation currRes: allReservations) {
            // Check if new start time is inside an existing window
            if(reservation.getStartTime().isAfter(currRes.getStartTime()) && reservation.getStartTime().isBefore(currRes.getEndTime())){
                return false;
            }
            // Check if new end time is inside an existing window
            else if (reservation.getEndTime().isAfter(currRes.getStartTime()) && reservation.getEndTime().isBefore(currRes.getEndTime())){
                return false;
            }
            // Check if a existing window is entirely swallowed by the new reservation
            else if(currRes.getStartTime().isAfter(reservation.getStartTime()) && currRes.getStartTime().isBefore(reservation.getEndTime())){
                return false;
            }
            else if (currRes.getEndTime().isAfter(reservation.getStartTime()) && currRes.getEndTime().isBefore(reservation.getEndTime())){
                return false;
            }
            // Check for exact boundary matches
            else if(reservation.getEndTime().isEqual(currRes.getEndTime() )|| reservation.getStartTime().isEqual(currRes.getStartTime())){
                return false;
            }
        }
        return true;
    }
}