package at.htl.leonding.leih.features.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;

@Entity
@NamedQuery(name="Teacher.findAll", query="SELECT i FROM Teacher i")

public class Teacher {
    @Id
    @GeneratedValue
    private Long teacher_id;
    private String teacher_first_name;
    private String teacher_last_name;
    private String teacher_email;

    public Long getTeacher_id() {
        return teacher_id;
    }

    public void setTeacher_id(Long teacher_id) {
        this.teacher_id = teacher_id;
    }

    public String getTeacher_first_name() {
        return teacher_first_name;
    }

    public void setTeacher_first_name(String teacher_first_name) {
        this.teacher_first_name = teacher_first_name;
    }

    public String getTeacher_last_name() {
        return teacher_last_name;
    }

    public void setTeacher_last_name(String teacher_last_name) {
        this.teacher_last_name = teacher_last_name;
    }

    public String getTeacher_email() {
        return teacher_email;
    }

    public void setTeacher_email(String teacher_email) {
        this.teacher_email = teacher_email;
    }
}
