package ru.dkit.real.logistic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ru.dkit.real.logistic.entities.routes.RouteList;

@SuppressWarnings("unused")
public interface RouteListManager {

  RouteList create(RouteList rl);

  RouteList read(Long id);

  Page<RouteList> readPage(Pageable pageable);

  RouteList update(RouteList rl);

  void delete(Long id);
}