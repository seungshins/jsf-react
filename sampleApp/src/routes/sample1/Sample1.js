import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import s from './Sample1.css';
import update from 'react-addons-update';

function Sample1({ title }) {
  return (
    <Layout>
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <p>...</p>
        </div>
      </div>
    </Layout>
  );
}


Sample1.propTypes = {
    title: PropTypes.string.isRequired,
};


var Sample1 = React.createClass({

    getInitialState: function(){
        return {
            searchString: '' ,
            members: [{ id: "id_0", name: '지혜인', show: false, info:'LG CNS 전략 사업부 IoT사업담당 IoTPlatform팀', project: '클라우드 TV', skills: 'Javascript,Java,Python,', email: 'hyein731@lgcns.com', phone: '010-3919-9007', location: '영등포구 양평로 17길 22', position: '대리'},
            { id: "id_1", name: '김봉섭', show: false, info:'LG CNS 전략 사업부 IoT사업담당 IoTPlatform팀', project: 'LG전자 webOS', skills: 'Javascript,C,', email: 'kbs12e@lgcns.com', phone: '010-1234-5678', location: '서초 LG전자 R&D 캠퍼스', position: '과장'},
            { id: "id_2", name: '김승신', show: false, info:'LG CNS 전략 사업부 IoT사업담당 IoTPlatform팀', project: '프로젝트 프로젝트 프로젝트', skills: 'C,Javascript,Java,', email: 'seungshins@lgcns.com', phone: '010-1111-2222', location: '여의도', position: '대리'},
            { id: "id_3", name: '최상준', show: false, info:'LG CNS 전략 사업부 IoT사업담당 IoTPlatform팀', project: '미국 의료', skills: 'HTML,C,C++,', email: '1234@lgcns.com', phone: '010-1234-9876', location: '상암동', position: '사원'},
            { id: "id_4", name: '유영훈', show: false, info:'LG CNS 전략 사업부 IoT사업담당 IoTPlatform팀', project: 'LG U+ onoM2M', skills: 'Java,', email: 'abc123@lgcns.com', phone: '010-1111-3333', location: '상암동', position: '사원'},
            { id: "id_5", name: '하상경', show: false, info:'LG CNS 전략 사업부 IoT사업담당 IoTPlatform팀', project: '2016 데이터베이스', skills: 'Python,C++,', email: 'hello@lgcns.com', phone: '010-8888-8888', location: '여의도', position: '사원'},
            { id: "id_6", name: '김청하', show: false, info:'LG CNS 전략 사업부 IoT사업담당 IoTPlatform팀', project: '미국 의료', skills: 'Javascript,', email: 'ganada@lgcns.com', phone: '010-1212-3434', location: '상암동', position: '사원'}],
            popup: 0};
    },

    search: function(e){
        this.setState({searchString:e.target.value, members: this.state.members, popup: 0});
    },

    showDetails: function(id){
        var li = this.state.members;
        for (var i = 0; i < li.length; i++) {
            li[i].show = (li[i].id == id && !li[i].show)? true : false;
        }
        this.setState({searchString:this.state.searchString, members: li, popup: 0});
    },

    openAddPopup: function(){
        this.setState({searchString:this.state.searchString, members: this.state.members, popup: 1});
    },
	
    openEditPopup: function(){
        this.setState({searchString:this.state.searchString, members: this.state.members, popup: 2});
    },

    closePopup: function(){
        this.setState({searchString:this.state.searchString, members: this.state.members, popup: 0});
    },

    _addItem(data){
        var item = {
            id: new Date().getTime(),
            name: data.name,
            show: false,
            info:data.info,
            project: data.project,
            skills: data.skills,
            email: data.email,
            phone: data.phone,
            location: data.location,
            position: data.position
        };
        //console.log(item);
        /*let members = update(this.state, {
            members: {
                $push: [item]
            }
        });
        this.setState(newState);*/// update로 member랑 popup 동시에 바꾸려면?
        var li = this.state.members;
        li.push(item);
        this.setState({searchString:this.state.searchString, members: li, popup: 0});
    },

    _removeItem(id){
        var li = this.state.members;
        for (var i = 0; i < li.length; i++) {
            if (li[i].id == id) {
                li.splice(i, 1);
            }
        }
        this.setState({searchString:this.state.searchString, members: li, popup: 0});
    },

    _editItem: function(data){
        var item = {
            id: data.id,
            name: data.name,
            show: data.show,
            info:data.info,
            project: data.project,
            skills: data.skills,
            email: data.email,
            phone: data.phone,
            location: data.location,
            position: data.position
        };

        var li = this.state.members;
        for (var i = 0; i < li.length; i++) {
            if (li[i].id == data.id) {
                li[i] = item;
            }
        }
        this.setState({searchString:this.state.searchString, members: li, popup: 0});
    },

    render: function() {
        var self = this;
        var dataForSearch = this.state.members;
        var searchString = this.state.searchString.trim().toLowerCase();

        if(searchString.length > 0){
            dataForSearch = this.state.members.filter(function(l){
                return l.name.toLowerCase().match( searchString );
            });
        }

        const popupNum = this.state.popup;
        let popup = null;
        if (popupNum == 1) {
            popup = <AddPage onCreate={self._addItem} onClose={self.closePopup}/>;
        } else if (popupNum == 2) {
            var li = this.state.members;
            for (var i = 0; i < li.length; i++) {
                if (li[i].show) {
                    var selectedItem = li[i];
                    popup = <EditPage name={li[i].name} id={li[i].id} info={li[i].info} project = {li[i].project} skills = {li[i].skills} email = {li[i].email} phone = {li[i].phone} location = {li[i].location} position = {li[i].position} onEdit={self._editItem} onClose={self.closePopup}/>;
                    break;
                }
            }
        }

        return <Layout>
            <div className={s.root}>
                <input type="text" id={s.searchInput} value={this.state.searchString} onChange={this.search} placeholder="검색할 이름을 입력하세요" />
                <ul id={s.empList}>
                    { dataForSearch.map(function(l, index){
                        return <div className={s.empListContents} key={index}>
                            <li>{l.name}
                                <a onClick={self.showDetails.bind(self, l.id)}>{ l.show ? '프로필 닫기' : '프로필 보기'}</a>
                                { l.show ? <div id={s.detailButtons}><button className={s.editDetail} onClick={self.openEditPopup}>edit</button><EmpRemover onRemove={self._removeItem.bind(self, l.id)}/></div> : null}
                            </li>
                            {l.show? <Details name={l.name} 
                                        id={l.id}
                                        info={l.info}
                                        project = {l.project}
                                        skills = {l.skills}
                                        email = {l.email}
                                        phone = {l.phone}
                                        location = {l.location}
                                        position = {l.position}
                                        key={l.id}/> : null
                            }
                            </div>
                        })}
                </ul>
                {popup}
                <button className={s.addDetail} onClick={this.openAddPopup}>+</button>
            </div>
        </Layout>;
    }
});

									  
class EmpRemover extends React.Component {
    handleClick() {
        this.props.onRemove();
    }
 
    render() {
        return (
            <button className={s.deleteDetail} onClick={this.handleClick.bind(this)}>delete</button>
        );
    }
}

									  
class AddPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone: "",
            position: "사원",
            project: "",
            skills: "",
            email: "",
            location: "",
            info: "",
        };
    }

    handleChange(e){
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleCheckBox(e){
        var skills = this.state.skills;
        if (e.target.checked) {
            skills += e.target.value + ',';
        } else {
            skills = skills.replace(e.target.value + ',', '');
        }
        this.setState({name:this.state.name, skills: skills, phone:this.state.phone, position:this.state.position, project:this.state.project, email:this.state.email, location:this.state.location, info:this.state.info});
    }

    saveClick() {
        this.props.onCreate(this.state);
    }
					  
    cancelClick() {
        this.props.onClose();
    }

    render() {
        return (
            <div className={s.addPopup}>
                <input type="text" id={s.nameInput} name="name" value={this.state.name} onChange={this.handleChange.bind(this)} placeholder="name"/>
                <select id={s.positionInput} name="position" value={this.state.position} onChange={this.handleChange.bind(this)}>
                    <option value="사원">사원</option>
                    <option value="대리">대리</option>
                    <option value="과장">과장</option>
                    <option value="차장">차장</option>
                    <option value="부장">부장</option>
                </select>

                <input type="text" id={s.phoneInput} name="phone" value={this.state.phone} onChange={this.handleChange.bind(this)} placeholder="phone"/>
                <input type="text" id={s.emailInput} name="email" value={this.state.email} onChange={this.handleChange.bind(this)} placeholder="email"/>
                <input type="text" id={s.locationInput} name="location" value={this.state.location} onChange={this.handleChange.bind(this)} placeholder="location"/>
                <input type="text" id={s.projectInput} name="project" value={this.state.project} onChange={this.handleChange.bind(this)} placeholder="project"/>
                <textarea id={s.infoInput} name="info" placeholder="info" value={this.state.info} onChange={this.handleChange.bind(this)}/>
                <div id={s.checkBoxGroup}>
                    <input type="checkbox" className={s.skillsInput} name="skills" id="skill1" onClick={this.handleCheckBox.bind(this)} value="Java"/><label htmlFor="skill1"></label><span>Java</span>
                    <input type="checkbox" className={s.skillsInput} name="skills" id="skill2" onClick={this.handleCheckBox.bind(this)} value="Javascript"/><label htmlFor="skill2"></label><span>Javascript</span>
                    <input type="checkbox" className={s.skillsInput} name="skills" id="skill3" onClick={this.handleCheckBox.bind(this)} value="C"/><label htmlFor="skill3"></label><span>C</span>
                    <input type="checkbox" className={s.skillsInput} name="skills" id="skill4" onClick={this.handleCheckBox.bind(this)} value="C#"/><label htmlFor="skill4"></label><span>C#</span>
                    <input type="checkbox" className={s.skillsInput} name="skills" id="skill5" onClick={this.handleCheckBox.bind(this)} value="C++"/><label     htmlFor="skill5"></label><span>C++</span>
                    <input type="checkbox" className={s.skillsInput} name="skills" id="skill6" onClick={this.handleCheckBox.bind(this)} value="Python"/><label htmlFor="skill6"></label><span>Python</span>
                    <input type="checkbox" className={s.skillsInput} name="skills" id="skill7" onClick={this.handleCheckBox.bind(this)} value="HTML"/><label htmlFor="skill7"></label><span>HTML</span>
                </div>
                <button className={s.saveButton} onClick={this.saveClick.bind(this)}>Save</button>
                <button className={s.closeButton} onClick={this.cancelClick.bind(this)}>Cancel</button>
            </div>
        );
    }
}


class EditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            phone: props.phone,
            position: props.position,
            project: props.project,
            skills: props.skills,
            email: props.email,
            location: props.location,
            info: props.info,
            show: props.show,
        };
    }

    handleChange(e){
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleCheckBox(e){
        var skills = this.state.skills;
        if (e.target.checked) {
            skills += e.target.value + ',';
        } else {
            skills = skills.replace(e.target.value + ',', '');
        }
        this.setState({name:this.state.name, skills: skills, phone:this.state.phone, position:this.state.position, project:this.state.project, email:this.state.email, location:this.state.location, info:this.state.info});
    }

    saveClick() {
        this.props.onEdit(this.state);
    }

    cancelClick() {
        this.props.onClose();
    }

    render() {
        return (
            <div className={s.addPopup}>
                <input type="text" id={s.nameInput} name="name" value={this.state.name} onChange={this.handleChange.bind(this)} placeholder="name"/>
                <select id={s.positionInput} name="position" value={this.state.position} onChange={this.handleChange.bind(this)}>
                    <option value="사원">사원</option>
                    <option value="대리">대리</option>
                    <option value="과장">과장</option>
                    <option value="차장">차장</option>
                    <option value="부장">부장</option>
                </select>

                <input type="text" id={s.phoneInput} name="phone" value={this.state.phone} onChange={this.handleChange.bind(this)} placeholder="phone"/>
                <input type="text" id={s.emailInput} name="email" value={this.state.email} onChange={this.handleChange.bind(this)} placeholder="email"/>
                <input type="text" id={s.locationInput} name="location" value={this.state.location} onChange={this.handleChange.bind(this)} placeholder="location"/>
                <input type="text" id={s.projectInput} name="project" value={this.state.project} onChange={this.handleChange.bind(this)} placeholder="project"/>
                <textarea id={s.infoInput} name="info" placeholder="info" value={this.state.info} onChange={this.handleChange.bind(this)}/>
                <div id={s.checkBoxGroup}>
                    <input type="checkbox" className={s.skillsInput} name="skills" id="skill1" defaultChecked={this.state.skills.split(',').indexOf("Java") == -1 ? false:true} onClick={this.handleCheckBox.bind(this)} value="Java"/><label htmlFor="skill1"></label><span>Java</span>
                    <input type="checkbox" className={s.skillsInput} name="skills" id="skill2" defaultChecked={this.state.skills.split(',').indexOf("Javascript") == -1 ? false:true} onClick={this.handleCheckBox.bind(this)} value="Javascript"/><label htmlFor="skill2"></label><span>Javascript</span>
                    <input type="checkbox" className={s.skillsInput} name="skills" id="skill3" defaultChecked={this.state.skills.split(',').indexOf("C") == -1 ? false:true} onClick={this.handleCheckBox.bind(this)} value="C"/><label htmlFor="skill3"></label><span>C</span>
                    <input type="checkbox" className={s.skillsInput} name="skills" id="skill4" defaultChecked={this.state.skills.split(',').indexOf("C#") == -1 ? false:true} onClick={this.handleCheckBox.bind(this)} value="C#"/><label htmlFor="skill4"></label><span>C#</span>
                    <input type="checkbox" className={s.skillsInput} name="skills" id="skill5" defaultChecked={this.state.skills.split(',').indexOf("C++") == -1 ? false:true} onClick={this.handleCheckBox.bind(this)} value="C++"/><label htmlFor="skill5"></label><span>C++</span>
                    <input type="checkbox" className={s.skillsInput} name="skills" id="skill6" defaultChecked={this.state.skills.split(',').indexOf("Python") == -1 ? false:true} onClick={this.handleCheckBox.bind(this)} value="Python"/><label htmlFor="skill6"></label><span>Python</span>
                    <input type="checkbox" className={s.skillsInput} name="skills" id="skill7" defaultChecked={this.state.skills.split(',').indexOf("HTML") == -1 ? false:true} onClick={this.handleCheckBox.bind(this)} value="HTML"/><label htmlFor="skill7"></label><span>HTML</span>
                </div>
                <button className={s.saveButton} onClick={this.saveClick.bind(this)}>Save</button>
                <button className={s.closeButton} onClick={this.cancelClick.bind(this)}>Cancel</button>
            </div>
        );
    }
}


class Details extends React.Component {

    constructor(props) {
        super(props);
        this.state = {focused: 0};
    }

    clicked(index){
        this.setState({focused: index});
    }

    render() {
        var self = this;
        var category = ['Info', 'Project', 'Skills', 'Contact'];
        var contents = ['직급: '+ this.props.position + '\n' + this.props.info, this.props.project, this.props.skills.slice(0,-1), this.props.email + '\n' + this.props.phone + '\n' + this.props.location];

        return (
            <div>
                <ul id={s.detailList}>{ category.map(function(m, index){
                    var style = '';
                    if(self.state.focused == index){
                        style = s.focused;
                    }
                    return <li className={style} key={index} onClick={self.clicked.bind(self, index)}>{m}</li>;
                })}
                </ul>
                
                <div className={s.detailInfo}>
                    {contents[this.state.focused].split('\n').map(line => { return (<span>{line}<br/></span>)})}
                </div>
            </div>
        );
    }
};

export default withStyles(s)(Sample1);
