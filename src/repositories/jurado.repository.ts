import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Jurado, JuradoRelations, Juradoxsolicitud} from '../models';
import {JuradoxsolicitudRepository} from './juradoxsolicitud.repository';

export class JuradoRepository extends DefaultCrudRepository<
  Jurado,
  typeof Jurado.prototype.id,
  JuradoRelations
> {

  public readonly juradoxsolicituds: HasManyRepositoryFactory<Juradoxsolicitud, typeof Jurado.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('JuradoxsolicitudRepository') protected juradoxsolicitudRepositoryGetter: Getter<JuradoxsolicitudRepository>,
  ) {
    super(Jurado, dataSource);
    this.juradoxsolicituds = this.createHasManyRepositoryFactoryFor('juradoxsolicituds', juradoxsolicitudRepositoryGetter,);
    this.registerInclusionResolver('juradoxsolicituds', this.juradoxsolicituds.inclusionResolver);
  }
}
