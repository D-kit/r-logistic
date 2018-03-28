package ru.dkit.real.logistic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.dkit.real.logistic.entities.routes.Route;
import ru.dkit.real.logistic.entities.routes.RouteList;
import ru.dkit.real.logistic.repositories.RouteListRepo;
import ru.dkit.real.logistic.repositories.RouteRepo;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

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
      List<Route> routes = rl.getRoutes().stream().peek(r -> r.setRouteList(rl)).collect(Collectors.toList());
      routeRepo.save(routes);
      rl.setRoutes(routes);
      return rl;
    }
    throw new RuntimeException();
  }

  public RouteList read(Long id) {
    return id != null ? routeListRepo.findOne(id) : null;
  }

  public Page<RouteList> readPage(Pageable pageable) {
    return routeListRepo.findAll(pageable);
  }

  @Transactional
  public RouteList update(RouteList rl) {
    RouteList rldb = read(rl.getId());
    if (rldb != null) {
      rl.setVersion(rldb.getVersion());
      rl.setRoutes(rl.getRoutes().stream().peek(r -> r.setRouteList(rldb)).collect(Collectors.toList()));
      routeListRepo.save(rl);
      return rl;
    }
    throw new RuntimeException("Не найден МЛ для обновления");
  }

  public void delete(Long id) {
    routeListRepo.delete(id);
  }
}