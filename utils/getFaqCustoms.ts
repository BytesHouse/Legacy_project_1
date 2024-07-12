interface CustomsFaq {
  title_1: string;
  nameAddress: string;
  text_1: string;
  customId: string;
  title_2: string;
  text_2: string;
  hours: string;
  title_3: string;
  vidoo: boolean;
  text_3: string;
  no_data_3: string;
  title_4: string;
  text_4: string;
  no_data_4: string;
  title_5: string;
  text_5: string;
  email: string;
  phones: string;
}

export const getFaqCustoms = (obj: CustomsFaq) => {
  const {
    title_1,
    nameAddress,
    text_1,
    customId,
    title_2,
    text_2,
    hours,
    title_3,
    vidoo,
    text_3,
    no_data_3,
    title_4,
    text_4,
    no_data_4,
    title_5,
    text_5,
    email,
    phones,
  } = obj;
  const formatHours = hours.replace(/[^a-zа-яё0-9-:\s]/gi, " ");
  const formatPhones = phones.replace(/[^a-zа-яё0-9+\s]/gi, " ");
  return [
    {
      title: `${title_1} ${nameAddress}`,
      text: ` ${text_1} ${customId}`,
    },
    {
      title: `${title_2}`,
      text: `${text_2} ${formatHours} `,
    },
    {
      title: `${title_3} `,
      text: vidoo ? `${text_3}` : `${no_data_3}`,
    },
    {
      title: `${title_4}`,
      text: false // here must be results but backend dosn't work
        ? `${text_4}`
        : `${no_data_4}`,
    },
    {
      title: `${title_5}`,
      text: [`${text_5}`, `${email}`, `${formatPhones}`],
    },
  ];
};
