export function month_time_difference(
  startDateField: string,
  allowedNumberOfMonths: number,
) {
  return (value: string, params: any) => {
    const startDate = new Date(params[startDateField]);

    const endDate = new Date(value);

    const monthsDifference =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    const daysDifference =
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

    if (
      monthsDifference > allowedNumberOfMonths ||
      (monthsDifference === allowedNumberOfMonths && daysDifference > 30)
    ) {
      return `PERIOD_SHOULD_NOT_BE_MORE_${allowedNumberOfMonths}_MONTH`;
    }
  };
}
