package at.htl.leonding.leih.model;

import jakarta.persistence.NamedQuery;

import java.util.ArrayList;
import java.util.List;
//@NamedQuery(name=FotoCam.QUERY_FIND_ALL, query="SELECT i FROM Item i where i.item_description = 'photo_camera'")

public class FotoCam extends Item {
    public FotoCam() {
        super();
    }

    public static List<FotoCam> fotosCams = new ArrayList<>();

    public static List<FotoCam> getallFotosCams() {
        return fotosCams;
    }

    public void addFotoCam(FotoCam fotoCam) {
        fotosCams.add(fotoCam);
    }

}
