package at.htl.leonding.leih.model;

import java.util.ArrayList;
import java.util.List;

public class FotoCam extends Item{
    public static String QUERY_FIND_ALL = "select * from item where item_description = photo_camera";
    public FotoCam(){
        super();
    }
    public static List<FotoCam> fotosCams = new ArrayList<>();

    public static List<FotoCam> getallFotosCams(){
        return fotosCams;
    }

    public void addFotoCam(FotoCam fotoCam){
        fotosCams.add(fotoCam);
    }

}
