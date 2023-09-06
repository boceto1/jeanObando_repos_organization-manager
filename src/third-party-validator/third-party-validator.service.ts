import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

interface IRepository {
  id: number;
  state: number;
}

@Injectable()
export class ThirdPartyValidatorService {
  constructor(private readonly httpService: HttpService) {}

  async getRepositoryState(id: number): Promise<IRepository[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<IRepository[]>(`http://localhost:3000/mock-api/${id}`)
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
}
