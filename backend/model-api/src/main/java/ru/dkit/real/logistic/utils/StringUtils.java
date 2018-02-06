package ru.dkit.real.logistic.utils;

import java.util.function.Function;
import java.util.function.Predicate;

public class StringUtils {
  public final static Predicate<String> notEmpty = (s) -> s != null && !s.isEmpty();
  public final static Function<String, String> getUpFirstChar = (String s) -> s.substring(0, 1).toUpperCase();
  public final static Function<String, String> upFirstChar = (String s) -> getUpFirstChar.apply(s) + s.substring(1).toLowerCase();
}