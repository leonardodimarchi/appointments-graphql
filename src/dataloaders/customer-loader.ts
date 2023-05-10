import DataLoader from "dataloader";
import { CustomerModel } from "../models/customer-model";
import { CustomerViewModel } from "../dtos/view-models/customer-view-model";

export const customerLoader = new DataLoader(async keys => {
  const ids = keys as string[];

  const customers = await CustomerModel.findByIds(ids);

  const customerById = customers.reduce((byId, customer) => {
    const viewModel: CustomerViewModel = {
      id: customer.id,
      name: customer.name,
      appointments: [],
    };

    byId[customer.id] = viewModel;

    return byId;
  }, {} as Record<string, CustomerViewModel>);

  return ids.map(id => customerById[id]);
})