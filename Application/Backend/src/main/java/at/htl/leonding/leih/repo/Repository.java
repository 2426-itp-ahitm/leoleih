package at.htl.leonding.leih.repo;

import at.htl.leonding.leih.model.FotoCam;
import at.htl.leonding.leih.model.Item;
import at.htl.leonding.leih.model.Micro;
import at.htl.leonding.leih.model.VideoCam;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class Repository {
    @Inject
    EntityManager entityManager;

    public List<Item> getAllPhotoCameras() {
        //todo
        List<Item> list = this.entityManager.createNamedQuery("Item.findAll", Item.class).getResultList();
        return list;
    }
/*
    public List<VideoCam> getAllVideoCameras() {

        return this.entityManager.createNamedQuery(VideoCam.QUERY_FIND_ALL, VideoCam.class).getResultList();
    }

    public List<Micro> getAllAudioDevices() {
        return this.entityManager.createNamedQuery(Micro.QUERY_FIND_ALL, Micro.class).getResultList();
    }

    public List<Item> getAllItems() {
        return this.entityManager.createNamedQuery(Item.QUERY_FIND_ALL, Item.class).getResultList();
    }*/
}