import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Juradoxsolicitud, JuradoxsolicitudRelations, Solicitud, Jurado} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {JuradoRepository} from './jurado.repository';

export class JuradoxsolicitudRepository extends DefaultCrudRepository<
  Juradoxsolicitud,
  typeof Juradoxsolicitud.prototype.id,
  JuradoxsolicitudRelations
> {

  public readonly idsolicitud: BelongsToAccessor<Solicitud, typeof Juradoxsolicitud.prototype.id>;

  public readonly idjurado: BelongsToAccessor<Jurado, typeof Juradoxsolicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('JuradoRepository') protected juradoRepositoryGetter: Getter<JuradoRepository>,
  ) {
    super(Juradoxsolicitud, dataSource);
    this.idjurado = this.createBelongsToAccessorFor('idjurado', juradoRepositoryGetter,);
    this.registerInclusionResolver('idjurado', this.idjurado.inclusionResolver);
    this.idsolicitud = this.createBelongsToAccessorFor('idsolicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('idsolicitud', this.idsolicitud.inclusionResolver);
  }
}
