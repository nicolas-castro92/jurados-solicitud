import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Jurado, JuradoRelations, Juradoxsolicitud, Usuariojurado} from '../models';
import {JuradoxsolicitudRepository} from './juradoxsolicitud.repository';
import {UsuariojuradoRepository} from './usuariojurado.repository';

export class JuradoRepository extends DefaultCrudRepository<
  Jurado,
  typeof Jurado.prototype.id,
  JuradoRelations
> {

  public readonly juradoxsolicituds: HasManyRepositoryFactory<Juradoxsolicitud, typeof Jurado.prototype.id>;

  public readonly usuariojurado: HasOneRepositoryFactory<Usuariojurado, typeof Jurado.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('JuradoxsolicitudRepository') protected juradoxsolicitudRepositoryGetter: Getter<JuradoxsolicitudRepository>, @repository.getter('UsuariojuradoRepository') protected usuariojuradoRepositoryGetter: Getter<UsuariojuradoRepository>,
  ) {
    super(Jurado, dataSource);
    this.usuariojurado = this.createHasOneRepositoryFactoryFor('usuariojurado', usuariojuradoRepositoryGetter);
    this.registerInclusionResolver('usuariojurado', this.usuariojurado.inclusionResolver);
    this.juradoxsolicituds = this.createHasManyRepositoryFactoryFor('juradoxsolicituds', juradoxsolicitudRepositoryGetter,);
    this.registerInclusionResolver('juradoxsolicituds', this.juradoxsolicituds.inclusionResolver);
  }
}
