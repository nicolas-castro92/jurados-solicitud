import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Jurado} from './jurado.model';
import {Solicitud} from './solicitud.model';

@model({
  settings: {
    foreignKeys: {
      solicitud_fk: {
        name: 'fk_solicitud',
        entity: 'Solicitud',
        entityKey: 'id',
        foreignKey: 'id_solicitud'
      },
      jurado_fk: {
        name: 'fk_jurado',
        entity: 'Jurado',
        entityKey: 'id',
        foreignKey: 'id_jurado'
      }
    }
  }
})
export class Juradoxsolicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
  })
  fecha_invitacion?: string;

  @property({
    type: 'date',
  })
  fecha_respuesta?: string;

  @property({
    type: 'string',
  })
  respuesta?: string;

  @property({
    type: 'string',
  })
  observaciones?: string;

  @belongsTo(() => Solicitud, {name: 'idsolicitud'})
  id_solicitud: number;

  @belongsTo(() => Jurado, {name: 'idjurado'})
  id_jurado: number;

  constructor(data?: Partial<Juradoxsolicitud>) {
    super(data);
  }
}

export interface JuradoxsolicitudRelations {
  // describe navigational properties here
}

export type JuradoxsolicitudWithRelations = Juradoxsolicitud & JuradoxsolicitudRelations;
