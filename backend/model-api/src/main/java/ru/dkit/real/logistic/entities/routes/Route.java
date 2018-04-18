package ru.dkit.real.logistic.entities.routes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ru.dkit.real.logistic.entities.core.AbstractEntity;
import ru.dkit.real.logistic.entities.core.Organization;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "route")
@SequenceGenerator(name = "entity_id_gen", sequenceName = "ROUTE_SEQ", allocationSize = 1)
@SuppressWarnings("unused")
public class Route extends AbstractEntity {

  @Column(name = "num_waybill", nullable = false)
  private String numWaybill;
  @Column(name = "num_pallet", nullable = false)
  private Integer numPallet;
  @Column(name = "num_box", nullable = false)
  private Integer numBox;
  @Column(name = "weight", nullable = false)
  private Integer weight;
  @Column(name = "temperature", nullable = false)
  private Integer temperature;
  @ManyToOne
  @JoinColumn(name = "id_consignee") //грузополучатель
  private Organization consignee;
  @JoinColumn(name = "delivery_date")
  private Date deliveryDate;
  @ManyToOne
  @JoinColumn(name = "id_client")
  private Organization client;
  @ManyToOne
  @JoinColumn(name = "id_source_wsh")
  private Warehouse sourceWhs;
  @ManyToOne
  @JoinColumn(name = "id_destination_wsh")
  private Warehouse destinationWhs;

  @JsonIgnore
  @ManyToOne
  @JoinColumn(name = "id_routelist")
  private RouteList routeList;

  public Route() {
  }

  public String getNumWaybill() {
    return numWaybill;
  }

  public void setNumWaybill(String numWaybill) {
    this.numWaybill = numWaybill;
  }

  public Integer getNumPallet() {
    return numPallet;
  }

  public void setNumPallet(Integer numPallet) {
    this.numPallet = numPallet;
  }

  public Integer getNumBox() {
    return numBox;
  }

  public void setNumBox(Integer numBox) {
    this.numBox = numBox;
  }

  public Integer getWeight() {
    return weight;
  }

  public void setWeight(Integer weight) {
    this.weight = weight;
  }

  public Integer getTemperature() {
    return temperature;
  }

  public void setTemperature(Integer temperature) {
    this.temperature = temperature;
  }

  public RouteList getRouteList() {
    return routeList;
  }

  public void setRouteList(RouteList routeList) {
    this.routeList = routeList;
  }

  public Organization getClient() {
    return client;
  }

  public void setClient(Organization client) {
    this.client = client;
  }

  public Organization getConsignee() {
    return consignee;
  }

  public void setConsignee(Organization consignee) {
    this.consignee = consignee;
  }

  public Warehouse getSourceWhs() {
    return sourceWhs;
  }

  public void setSourceWhs(Warehouse sourceWhs) {
    this.sourceWhs = sourceWhs;
  }

  public Warehouse getDestinationWhs() {
    return destinationWhs;
  }

  public void setDestinationWhs(Warehouse destinationWhs) {
    this.destinationWhs = destinationWhs;
  }

  public Date getDeliveryDate() {
    return deliveryDate;
  }

  public void setDeliveryDate(Date deliveryDate) {
    this.deliveryDate = deliveryDate;
  }
}