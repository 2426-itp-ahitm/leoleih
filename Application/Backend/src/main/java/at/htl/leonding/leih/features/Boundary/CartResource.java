package at.htl.leonding.leih.features.Boundary;

import at.htl.leonding.leih.features.Model.DeviceCart;
import at.htl.leonding.leih.features.Repo.CartRepo;
import com.sun.codemodel.JForEach;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import at.htl.leonding.leih.features.DTO.DeviceDTO;
import at.htl.leonding.leih.features.Model.Device;
import at.htl.leonding.leih.features.Repo.DeviceRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;
import java.util.List;

@Produces(MediaType.APPLICATION_JSON)
@Path("/cart")
public class CartResource {
    @Inject
    CartRepo cartRepo;
    @Inject
    DeviceRepository deviceRepo;

    @GET
    public Response all(){
        return Response.ok().entity(cartRepo.getAllCarts()).build();
    }
    //TODO dafür sorgen dass die user id immer die cart id ist
    @POST
    @Path("/{cartId}/{deviceId}")
    @Transactional
    public Response reserveDevice(@PathParam("cartId") Long cartId, @PathParam("deviceId") Long deviceId){
        cartRepo.reserveDevice(cartId, deviceId);
        return Response.ok().build();
    }
    @GET
    @Path("/{cartId}")
        public Response getCart(@PathParam("cartId") Long cartId){
        List<Device> deviceList = new ArrayList<>();
        List list = cartRepo.getCart(cartId);
        for (Object o : list){
            DeviceCart deviceCart = (DeviceCart) o;
            Device device = deviceRepo.findById(((DeviceCart) o).getDev_id());
            deviceList.add(device);
        }

            return Response.ok().entity(deviceList).build();
        }
}
