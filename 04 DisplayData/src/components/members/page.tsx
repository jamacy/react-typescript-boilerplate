import * as React from 'react';
import { MemberEntity } from '../../model';
import { memberAPI } from '../../api/member';
import * as sample from './sample.js';
interface State {
  members: MemberEntity[];
}

export class MembersPage extends React.Component<{}, State> {
  constructor() {
    super();
    this.state = { members: [] };
  }

  public componentDidMount() {
    memberAPI.fetchMembers()
      .then((members) => {
        this.setState({ members });
      });
    this.enum();  
  }

  public enum(){
    enum Days { Sun, Mon, Tue, Wed, Thu, Fri, Sat };
    enum Color {Red, Green, Blue = "blue".length};
    console.log("Enum", Days['Sun'], Days[0]);
    console.log("sample",sample);
    console.log("generics",this.generics("23342"))
    console.log("generics",this.generics(2))
  }
  public generics<T>(arg: T): T {
    return arg;
  }
  public render() {
    return (
      <div className="row">
        <h2> Members Page</h2>
        <table className="table">
          <thead>
            {MemberHeader()}
          </thead>
          <tbody>
            {this.state.members.map(MemberRow)}
          </tbody>
        </table>
      </div>
    );
  }
};

const MemberHeader = () => {
  return (
    <tr>
      <th>Avatar</th>
      <th>Id</th>
      <th>Name</th>
    </tr>
  );
}

const MemberRow = (member: MemberEntity) => {
  return (
    <tr key={member.id}>
      <td>
        <img src={member.avatar_url} className="avatar" />
      </td>
      <td>
        <span>{member.id}</span>
      </td>
      <td>
        <span>{member.login}</span>
      </td>
    </tr>
  )
}
