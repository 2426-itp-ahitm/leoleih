package at.htl.leonding.leih.features.Model;

import jakarta.persistence.*;

@Entity
@NamedQuery(name="Teacher.findAll", query="SELECT i FROM Teacher i")

public class Teacher {
    @Id
    @GeneratedValue
    private Long teacher_id;
    @Column(name = "teacher_first_name")
    private String teacherFirstName;
    @Column(name = "teacher_last_name")
    private String teacherLastName;
    @Column(name = "teacher_email")
    private String teacherEmail;

    public Long getTeacher_id() {
        return teacher_id;
    }

    public void setTeacher_id(Long teacher_id) {
        this.teacher_id = teacher_id;
    }

    public String getTeacherFirstName() {
        return teacherFirstName;
    }

    public void setTeacherFirstName(String teacherFirstName) {
        this.teacherFirstName = teacherFirstName;
    }

    public String getTeacherLastName() {
        return teacherLastName;
    }

    public void setTeacherLastName(String teacherLastName) {
        this.teacherLastName = teacherLastName;
    }

    public String getTeacherEmail() {
        return teacherEmail;
    }

    public void setTeacherEmail(String teacherEmail) {
        this.teacherEmail = teacherEmail;
    }
}
