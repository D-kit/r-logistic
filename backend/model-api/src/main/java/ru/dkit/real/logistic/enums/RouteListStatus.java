package ru.dkit.real.logistic.enums;

/**
 * Статус МЛ
 */
public enum RouteListStatus {
  OPEN("Открыт");

  private final String value;

  RouteListStatus(String value) {
    this.value = value;
  }

  @Override
  public String toString() {
    return value;
  }
}