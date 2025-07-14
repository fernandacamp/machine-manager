import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
  Delete,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateMachineDto } from '../dto/create-machine.dto';
import { UpdateTelemetryDto } from '../dto/update-telemetry.dto';
import { MachinesService } from '../services/machines.service';

@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  /**
   * Retorna uma lista paginada de máquinas, com filtros opcionais por status e string de busca.
   *
   * @param page - Número da página (default: 1)
   * @param pageSize - Quantidade de itens por página (default: 10)
   * @param status - Filtro opcional por status da máquina
   * @param stringQuery - Filtro de texto para campos name ou location
   * @returns Lista paginada de máquinas
   */
  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
    @Query('status') status?: string,
    @Query('query') stringQuery?: string,
  ) {
    try {
      return await this.machinesService.findAll({
        page: Number(page),
        pageSize: Number(pageSize),
        status,
        stringQuery,
      });
    } catch (error) {
      throw new HttpException(
        'Erro inesperado ao buscar máquinas.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Busca uma máquina específica pelo seu ID.
   *
   * @param id - UUID da máquina
   * @returns A máquina correspondente ao ID
   * @throws NotFoundException se a máquina não for encontrada
   */
  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return await this.machinesService.findById(id);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new HttpException(
        'Erro inesperado ao buscar máquina.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Cria uma nova máquina.
   *
   * @param dto - Dados para criação da máquina (name, location, etc.)
   * @returns A máquina recém-criada
   */
  @Post()
  async create(@Body() dto: CreateMachineDto) {
    try {
      return await this.machinesService.create(dto);
    } catch (error) {
      throw new HttpException(
        'Erro inesperado ao cadastrar máquina.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Atualiza os dados de telemetria de uma máquina existente.
   *
   * @param id - UUID da máquina
   * @param dto - Dados parciais de telemetria (UpdateTelemetryDto)
   * @returns A máquina atualizada
   * @throws NotFoundException se a máquina não for encontrada
   */
  @Patch(':id/telemetry')
  async updateTelemetry(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTelemetryDto,
  ) {
    try {
      return await this.machinesService.updateTelemetry(id, dto);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new HttpException(
        'Erro inesperado ao atualizar telemetria.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Remove uma máquina existente pelo seu ID.
   *
   * @param id - UUID da máquina
   * @returns void
   * @throws NotFoundException se a máquina não for encontrada
   */
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return await this.machinesService.remove(id);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new HttpException(
        'Erro inesperado ao remover máquina.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
