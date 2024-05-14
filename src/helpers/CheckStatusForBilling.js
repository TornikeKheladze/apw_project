const { default: Badge } = require("components/Badge");

export const checkStatus = (statusId) => {
  switch (statusId) {
    case 1:
      return <Badge className="rounded-lg">რეგისტრირებული</Badge>;
    case 2:
      return (
        <Badge color="secondary" className="rounded-lg">
          მუშავდება
        </Badge>
      );
    case 3:
      return (
        <Badge color="success" className="rounded-lg">
          წარმატებული
        </Badge>
      );
    case 4:
      return (
        <Badge color="danger" className="rounded-lg">
          გაუქმებული
        </Badge>
      );
    case 5:
      return (
        <Badge color="warning" className="rounded-lg">
          დაბრუნებული
        </Badge>
      );
    default:
      return (
        <Badge color="info" className="rounded-lg">
          ამოუცნობი
        </Badge>
      );
  }
};

export const statusBadge = (statusId) => {
  switch (statusId) {
    case 1:
      return (
        <Badge color="success" className="rounded-lg">
          აქტიური
        </Badge>
      );
    case 0:
      return (
        <Badge color="danger" className="rounded-lg">
          არააქტიური
        </Badge>
      );
    default:
      return (
        <Badge color="info" className="rounded-lg">
          ამოუცნობი
        </Badge>
      );
  }
};
