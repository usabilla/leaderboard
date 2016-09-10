export class Player {
  firstName: string;
  lastName: string;
  workEmail: string;
  jobTitle: string;
  company: string;
  time: number;

  toJSON () {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      workEmail: this.workEmail,
      jobTitle: this.jobTitle,
      company: this.company,
      time: this.time
    };
  }
}
