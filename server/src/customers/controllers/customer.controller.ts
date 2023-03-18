import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CustomerDto } from '../dto/cutomer.dto';
import { CustomerService } from '../services/customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  saveCustomer(@Body() createCustomerDto: CustomerDto) {
    Logger.log(createCustomerDto);
    this.customerService.createCustomer(createCustomerDto);
    return HttpCode(201);
  }

  @Get()
  getAllCustomers() {
    return this.customerService.getCustomers();
  }

  @Get(':id')
  getSingleCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.getCustomerBasedOnId(id);
  }

  @Delete(':id')
  deleteCustomer(@Param('id', ParseIntPipe) id: number) {
    this.customerService.deleteCustomer(id);
    return HttpCode(204);
  }

  @Patch(':id')
  updateCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCustomerDto: CustomerDto,
  ) {
    return this.customerService.updateCustomer(id, updateCustomerDto);
  }
}
