// @flow weak

import React from 'react';
import {TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';

export const RouteFields = {
  deliveryDate: "Дата доставки",
  temperature: 'ТР',
  numWaybill: '№ накладной',
  numPallet: 'Палет, шт',
  numBox: 'Коробок, шт',
  weight: 'Вес, кг'
};

const header = (voc) => (Object.keys(voc) || []).map(
  val => (
    <TableHeaderColumn key={val}>
      {voc[val]}
    </TableHeaderColumn>
  )
);

export function headers() {
  return (
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        {header(RouteFields)}
      </TableRow>
    </TableHeader>
  )
}
