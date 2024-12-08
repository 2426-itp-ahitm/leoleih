package at.htl.leonding.leih.model;

import java.util.ArrayList;
import java.util.List;

public class VideoCam extends Item{
    public static String QUERY_FIND_ALL = "select * from item where item_description = video_camera";
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
