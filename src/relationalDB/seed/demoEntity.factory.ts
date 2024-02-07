import {setSeederFactory} from 'typeorm-extension';
import {DemoEntity} from '../../entities/demoEntity';

export default setSeederFactory(DemoEntity, (faker) => {
  const entity = new DemoEntity();
  entity.name = faker.word.words({count: {min: 1, max: 3}});
  return entity;
});
