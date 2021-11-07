import {Entity, model, property, hasMany} from '@loopback/repository';
import {Proponentexsolicitud} from './proponentexsolicitud.model';
import {Juradoxsolicitud} from './juradoxsolicitud.model';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
  })
  fecha_radicado?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_trabajo: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @hasMany(() => Proponentexsolicitud, {keyTo: 'id_solicitud'})
  proponentexsolicituds: Proponentexsolicitud[];

  @property({
    type: 'number',
  })
  id_estado?: number;

  @hasMany(() => Juradoxsolicitud, {keyTo: 'id_solicitud'})
  juradoxsolicituds: Juradoxsolicitud[];

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
