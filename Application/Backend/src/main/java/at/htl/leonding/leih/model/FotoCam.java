package at.htl.leonding.leih.model;

import java.util.ArrayList;
import java.util.List;

public class FotoCam extends Item{
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
