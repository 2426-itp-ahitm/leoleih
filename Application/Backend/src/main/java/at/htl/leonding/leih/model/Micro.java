package at.htl.leonding.leih.model;

import java.util.ArrayList;
import java.util.List;

public class Micro extends Item{
    public static String QUERY_FIND_ALL = "select i from item i where i.item_description = audio_device";
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
