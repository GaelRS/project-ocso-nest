import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, UnauthorizedException, Provider } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { UserData } from 'src/auth/decorators/user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { Auth } from 'src/auth/decorators/auth.docorator';
import { ROLES } from 'src/auth/constants/role.constants';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';


@ApiAuth()
@ApiTags('Providers')
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Auth(ROLES.MANAGER)
  @ApiOperation({ summary: 'Crear provedor', description: 'Crea un nuevo provedor en el Ocso.' })
  @ApiResponse({
    status: 201,
    example: {
      providerName:"Coca Cola",
      providerEmail: "provedor@ventas.com.mx",
      providerPhoneNumber: "228829299",
    } 
  })
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @ApiOperation({ summary: 'Mostrar todos los provedores', description: 'Muestra todos los provedores del Ocso' })
  @Get()
  findAll(@UserData() user: User) {
    if(user.userRoles.includes("Employee")) throw new UnauthorizedException("No estas autorizado solo admins y managers");
    return this.providersService.findAll();
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @ApiOperation({ summary: 'Buscar un provedor', description: 'Busca un provedor por su id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    const provider = this.providersService.findOne(id);
    if (!provider) {
      throw new NotFoundException();
    }
    return provider;
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @ApiOperation({ summary: 'Buscar provedor por nombre', description: 'Busca un provedor por su nombre' })
  @Get('/name/:name')
  findByName(@Param('name') name: string) {
    return this.providersService.findByName(name);
  }
   
  @Auth(ROLES.MANAGER)
  @ApiOperation({ summary: 'Actualizar provedor', description: 'Actualiza un provedor en el Ocso' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Auth(ROLES.MANAGER)
  @ApiOperation({ summary: 'Eliminar provedor', description: 'Elimina un provedor en el Ocso' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}
