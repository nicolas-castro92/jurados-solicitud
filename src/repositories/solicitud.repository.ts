import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Proponentexsolicitud, Juradoxsolicitud} from '../models';
import {ProponentexsolicitudRepository} from './proponentexsolicitud.repository';
import {JuradoxsolicitudRepository} from './juradoxsolicitud.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly proponentexsolicituds: HasManyRepositoryFactory<Proponentexsolicitud, typeof Solicitud.prototype.id>;

  public readonly juradoxsolicituds: HasManyRepositoryFactory<Juradoxsolicitud, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProponentexsolicitudRepository') protected proponentexsolicitudRepositoryGetter: Getter<ProponentexsolicitudRepository>, @repository.getter('JuradoxsolicitudRepository') protected juradoxsolicitudRepositoryGetter: Getter<JuradoxsolicitudRepository>,
  ) {
    super(Solicitud, dataSource);
    this.juradoxsolicituds = this.createHasManyRepositoryFactoryFor('juradoxsolicituds', juradoxsolicitudRepositoryGetter,);
    this.registerInclusionResolver('juradoxsolicituds', this.juradoxsolicituds.inclusionResolver);
    this.proponentexsolicituds = this.createHasManyRepositoryFactoryFor('proponentexsolicituds', proponentexsolicitudRepositoryGetter,);
    this.registerInclusionResolver('proponentexsolicituds', this.proponentexsolicituds.inclusionResolver);
  }
}
