import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Juradoxsolicitud} from './juradoxsolicitud.model';
import {Usuariojurado} from './usuariojurado.model';

@model()
export class Jurado extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
  })
  celular?: string;

  @property({
    type: 'string',
    required: true,
  })
  entidad: string;

  @hasMany(() => Juradoxsolicitud, {keyTo: 'id_jurado'})
  juradoxsolicituds: Juradoxsolicitud[];

  @hasOne(() => Usuariojurado, {keyTo: 'id_jurado'})
  usuariojurado: Usuariojurado;

  constructor(data?: Partial<Jurado>) {
    super(data);
  }
}

export interface JuradoRelations {
  // describe navigational properties here
}

export type JuradoWithRelations = Jurado & JuradoRelations;
