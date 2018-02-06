package ru.dkit.real.logistic.entities.routes;

import ru.dkit.real.logistic.entities.core.AbstractEntity;
import ru.dkit.real.logistic.entities.core.Organization;
import ru.dkit.real.logistic.enums.RouteListStatus;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "routelist")
@SequenceGenerator(name = "entity_id_gen", sequenceName = "ROUTELIST_SEQ", allocationSize = 1)
@SuppressWarnings("unused")
public class RouteList extends AbstractEntity {

  @Column(name = "number", nullable = false)
  private String number;
  @Column(name = "date", nullable = false)
  private Date date;
  @Column(name = "model_car")
  private String modelCar;
  @Column(name = "reg_num_car")
  private String regNumCar;
  @Column(name = "comment")
  private String comment;
  @OneToOne
  @JoinColumn(name = "id_shipper")
  private Organization shipperOrganization;
  @OneToMany(mappedBy = "routeList", cascade = CascadeType.ALL)
  private List<Route> routes;
  @Column(name = "status", nullable = false)
  @Enumerated
  private RouteListStatus status;

  public RouteList() {
    this.status = RouteListStatus.OPEN;
  }

  public String getNumber() {
    return number;
  }

  public void setNumber(String number) {
    this.number = number;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }

  public String getModelCar() {
    return modelCar;
  }

  public void setModelCar(String modelCar) {
    this.modelCar = modelCar;
  }

  public String getRegNumCar() {
    return regNumCar;
  }

  public void setRegNumCar(String regNumCar) {
    this.regNumCar = regNumCar;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  public Organization getShipperOrganization() {
    return shipperOrganization;
  }

  public void setShipperOrganization(Organization shipperOrganization) {
    this.shipperOrganization = shipperOrganization;
  }

  public List<Route> getRoutes() {
    return routes;
  }

  public void setRoutes(List<Route> routes) {
    this.routes = routes;
  }

  public RouteListStatus getStatus() {
    return status;
  }

  public void setStatus(RouteListStatus status) {
    this.status = status;
  }
}