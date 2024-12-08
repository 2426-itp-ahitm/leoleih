package at.htl.leonding.leih.model;

import java.util.ArrayList;
import java.util.List;

public class Micro extends Item{
    public Micro(){
        super();
    }
    public static List<Micro> micros = new ArrayList<>();

    public static List<Micro> getallMicros(){
        return micros;
    }

    public void addMicro(Micro micro){
        micros.add(micro);
    }
}
