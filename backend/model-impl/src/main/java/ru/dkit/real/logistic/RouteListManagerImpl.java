package ru.dkit.real.logistic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.dkit.real.logistic.entities.routes.RouteList;
import ru.dkit.real.logistic.repositories.RouteListRepo;
import ru.dkit.real.logistic.repositories.RouteRepo;

import javax.transaction.Transactional;

@Service
@SuppressWarnings("unused")
public class RouteListManagerImpl implements RouteListManager {

  private final RouteListRepo routeListRepo;
  private final RouteRepo routeRepo;

  @Autowired
  public RouteListManagerImpl(RouteListRepo routeListRepo,
                              RouteRepo routeRepo) {
    this.routeListRepo = routeListRepo;
    this.routeRepo = routeRepo;
  }

  @Transactional
  public RouteList create(RouteList rl) {
    if (rl.getId() == null) {
      routeListRepo.save(rl);
      rl.getRoutes().forEach(route -> {
        route.setRouteList(rl);
        routeRepo.save(route);
      });
      return rl;
    }
    return null;
  }

  public RouteList read(Long id) {
    return routeListRepo.findOne(id);
  }

  public Page<RouteList> readPage(Pageable pageable) {
    return routeListRepo.findAll(pageable);
  }

  @Transactional
  public RouteList update(RouteList rl) {
    return null;
  }

  public void delete(Long id) {
    routeListRepo.delete(id);
  }
}