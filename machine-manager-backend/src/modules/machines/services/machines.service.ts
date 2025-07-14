import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Machine } from '../entities/machine.entity';
import { CreateMachineDto } from '../dto/create-machine.dto';
import { UpdateTelemetryDto } from '../dto/update-telemetry.dto';
import { FindAllParams } from 'src/common/models/find-params.model';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine)
    private readonly machineRepository: Repository<Machine>, // Repositório injetado da entidade Machine
  ) {}

  /**
   * Lista todas as máquinas com suporte a paginação e filtros.
   * 
   * @param params - Objeto contendo filtros, paginação e busca textual.
   * @returns Um objeto contendo a lista paginada de máquinas e metadados de paginação.
   */
  async findAll(params: FindAllParams): Promise<{
    data: Machine[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    const { page, pageSize, status, stringQuery } = params;

    const query = this.machineRepository.createQueryBuilder('machine');

    if (status) {
      query.andWhere('machine.status = :status', { status });
    }

    if (stringQuery) {
      const likeQuery = `%${stringQuery.toLowerCase()}%`;
      query.andWhere(
        '(LOWER(machine.name) ILIKE :likeQuery OR LOWER(machine.location) ILIKE :likeQuery)',
        { likeQuery },
      );
    }

    query.skip((page - 1) * pageSize).take(pageSize);

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page,
      pageSize,
    };
  }

  /**
   * Busca uma máquina pelo ID.
   * 
   * @param id - Identificador da máquina.
   * @returns A máquina correspondente ao ID.
   * @throws NotFoundException - Se a máquina não for encontrada.
   */
  async findById(id: string): Promise<Machine> {
    const machine = await this.machineRepository.findOneBy({ id });

    if (!machine) {
      throw new NotFoundException(`Máquina com ID ${id} não encontrada.`);
    }

    return machine;
  }

  /**
   * Cria uma nova máquina.
   * 
   * @param dto - Dados da máquina a ser criada.
   * @returns A máquina recém-criada.
   */
  async create(dto: CreateMachineDto): Promise<Machine> {
    const machine = this.machineRepository.create(dto);
    return await this.machineRepository.save(machine);
  }

  /**
   * Atualiza os dados de telemetria de uma máquina existente.
   * 
   * @param id - Identificador da máquina.
   * @param dto - Dados de telemetria a serem atualizados.
   * @returns A máquina atualizada.
   * @throws NotFoundException - Se a máquina não for encontrada.
   */
  async updateTelemetry(id: string, dto: UpdateTelemetryDto): Promise<Machine> {
    const machine = await this.findById(id);
    this.machineRepository.merge(machine, dto);
    return await this.machineRepository.save(machine);
  }

  /**
   * Remove uma máquina do banco de dados.
   * 
   * @param id - Identificador da máquina a ser removida.
   * @throws NotFoundException - Se a máquina não for encontrada.
   */
  async remove(id: string): Promise<void> {
    const result = await this.machineRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Máquina com ID ${id} não encontrada.`);
    }
  }
}
