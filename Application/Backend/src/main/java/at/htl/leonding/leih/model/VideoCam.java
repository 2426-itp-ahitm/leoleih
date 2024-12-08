package at.htl.leonding.leih.model;

import java.util.ArrayList;
import java.util.List;

public class VideoCam extends Item{
    public VideoCam() {
        super();
    }
    public static List<VideoCam> videoCams = new ArrayList<>();

    public static List<VideoCam> getallVideoCams(){
        return videoCams;
    }

    public void addVideoCam(VideoCam videoCam){
        videoCams.add(videoCam);
    }
}
