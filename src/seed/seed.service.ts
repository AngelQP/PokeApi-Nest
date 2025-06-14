import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {


  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ){}

  async executeSeed() {

    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonsArray: CreatePokemonDto[] = [];

    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      // console.log(segments); // para saber en que posicion se encuentra el no en la URL
      const no: number = +segments[ segments.length -2 ];

      pokemonsArray.push({name, no});

      // console.log({name, no});
    })

    try {
      await this.pokemonModel.insertMany(pokemonsArray);   
    } catch (error) {
      console.log(error);
    }

    return `Seed excuted`;
  }


}
