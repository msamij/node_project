import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerAddress } from '../entities/address.entity';
import { Customer } from '../entities/customer.entity';
import { CustomerParams } from '../types/customerParams';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(CustomerAddress)
    private customerAddressRepository: Repository<CustomerAddress>,
  ) {}

  async createCustomer(customerParams: CustomerParams): Promise<void> {
    const customerAddress = new CustomerAddress();
    customerAddress.city = customerParams.city;
    customerAddress.streetName = customerParams.streetName;

    const savedAddress = await this.customerAddressRepository.save(
      customerAddress,
    );

    const customer = new Customer();
    customer.firstName = customerParams.firstName;
    customer.lastName = customerParams.lastName;
    customer.customerAddress = savedAddress;
    customer.age = customerParams.age;
    customer.phoneNo = customerParams.phoneNo;
    await this.customerRepository.save(customer);
  }

  getCustomers(): Promise<Customer[]> {
    return this.customerRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.customerAddress', 'customerAddress')
      .getMany();
  }

  getCustomerBasedOnId(id: number): Promise<Customer> {
    return this.customerRepository.findOne({ where: { id } });
  }

  async deleteCustomer(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }

  async updateCustomer(
    id: number,
    updateCustomer: CustomerParams,
  ): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: ['customerAddress'],
    });

    if (!customer)
      throw new NotFoundException(`Customer with ID ${id} not found`);

    if (updateCustomer.firstName) customer.firstName = updateCustomer.firstName;

    if (updateCustomer.lastName) customer.lastName = updateCustomer.lastName;

    if (updateCustomer.age) customer.age = updateCustomer.age;

    if (updateCustomer.phoneNo) customer.phoneNo = updateCustomer.phoneNo;

    if (updateCustomer.streetName || updateCustomer.city) {
      const customerAddress = customer.customerAddress;

      if (updateCustomer.streetName)
        customerAddress.streetName = updateCustomer.streetName;

      if (updateCustomer.city) customerAddress.city = updateCustomer.city;

      await this.customerAddressRepository.save(customerAddress);
    }

    const updatedCustomer = await this.customerRepository.save(customer);

    return updatedCustomer;

    // if (updateCustomer.streetName) {
    //   const customerAddress = await this.customerAddressRepository.findOne({
    //     where: { id: customer.customerAddress.id },
    //   });

    //   customerAddress.streetName = updateCustomer.streetName;
    //   await this.customerAddressRepository.save(customerAddress);
    // }

    // if (updateCustomer.city) {
    //   const customerAddress = await this.customerAddressRepository.findOne({
    //     where: { id: customer.customerAddress.id },
    //   });

    //   customerAddress.city = updateCustomer.city;
    //   await this.customerAddressRepository.save(customerAddress);
    // }

    // await this.customerRepository.save(customer);
    // return customer;
    // return await this.customerRepository
    //   .findOne({ where: { id }, relations: ['customerAddress'] })
    //   .then((customer) => {
    //     if (!customer)
    //       throw new NotFoundException(`Customer with ID ${id} not found`);

    //     if (updateCustomer.firstName)
    //       customer.firstName = updateCustomer.firstName;

    //     if (updateCustomer.lastName)
    //       customer.lastName = updateCustomer.lastName;

    //     if (updateCustomer.age) customer.age = updateCustomer.age;

    //     if (updateCustomer.phoneNo) customer.phoneNo = updateCustomer.phoneNo;

    //     if (updateCustomer.streetName) {
    //       this.customerAddressRepository
    //         .findOne({
    //           where: { id: customer.customerAddress.id },
    //         })
    //         .then((address) => {
    //           address.streetName = updateCustomer.streetName;
    //           return this.customerAddressRepository.save(address);
    //         });
    //     }

    //     if (updateCustomer.city) {
    //       this.customerAddressRepository
    //         .findOne({ where: { id: customer.customerAddress.id } })
    //         .then((address) => {
    //           address.city = updateCustomer.city;
    //           return this.customerAddressRepository.save(address);
    //         });
    //     }

    //     return this.customerRepository.save(customer);
    //   });
  }
}
