import {DataSource} from 'typeorm';
import {Seeder, SeederFactoryManager} from 'typeorm-extension';
import {DemoEntity} from '../../entities/demoEntity';

export default class DemoEntitySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const entityFactory = await factoryManager.get(DemoEntity);
    await entityFactory.saveMany(1000);
  }
}
