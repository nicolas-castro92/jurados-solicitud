import {Entity, hasMany, model, property} from '@loopback/repository';
import {Juradoxsolicitud} from './juradoxsolicitud.model';
import {Proponentexsolicitud} from './proponentexsolicitud.model';

@model({
  settings: {
    foreignKeys: {
      estado_fk: {
        name: 'fk_estado',
        entity: 'Estado',
        entityKey: 'id',
        foreignKey: 'id_estado'
      }
    }
  }
})
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
