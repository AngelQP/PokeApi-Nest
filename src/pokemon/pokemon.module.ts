import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([
      {
      // el name se extiende del Document y no de la propiedad de la clase Pokemon
      name: Pokemon.name,
      schema: PokemonSchema,
      }
    ])
  ],
  exports: [MongooseModule],
})
export class PokemonModule {}
