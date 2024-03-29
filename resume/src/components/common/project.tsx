import styled from 'styled-components';
import { Resources } from '../../resources';

export interface ProjectProps {
  name: string;
  description: string;
  whatIdo: string[];
  whatIdoTitle: string;
  skills: string[];
  period: string;
  urls?: string[];
}

const SkillShieldContainer = styled.div({
  display: 'inline-block',
  backgroundColor: '#eee',
  borderRadius: '4px',
  marginTop: '16px',
  marginRight: '8px',
  padding: '3px 6px 3px 6px'
});

function SkillShield(props: { children: string }) {
  return (
    <SkillShieldContainer>
      <span>{props.children}</span>
    </SkillShieldContainer>
  );
}

const ProjectTitle = styled.span({
  fontSize: '16px',
  fontWeight: 'bold'
});

function ProjectInfo(props: { title: string; description: string; period: string; urls?: string[] }) {
  function UrlIcon(urlIconProps: { url: string }) {
    let icon;
    if (urlIconProps.url.includes('google')) {
      icon = Resources.playstore_512;
    } else if (urlIconProps.url.includes('apple')) {
      icon = Resources.appstore_512;
    } else if (urlIconProps.url.includes('github.com')) {
      icon = Resources.github_512;
    } else {
      icon = Resources.url;
    }

    return (
      <a style={{ marginLeft: '8px' }} href={urlIconProps.url} target='_blank' rel='noreferrer'>
        <img src={icon} width={36} alt={'Icon'} />
      </a>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ProjectTitle>{props.title}</ProjectTitle>
        <span style={{ marginLeft: '4px' }}>({props.period})</span>
        {props.urls &&
          props.urls.map((url: string) => {
            return <UrlIcon key={url} url={url} />;
          })}
        <div style={{ display: 'flex', flex: 1, height: '2px', backgroundColor: '#bbb', marginLeft: '16px' }} />
      </div>
      <span>{props.description}</span>
    </>
  );
}

const DoDescriptionTitle = styled.span({
  display: 'block',
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '4px'
});

const DoDescriptionContainer = styled.div({
  marginTop: '16px'
});

function DoDescription(props: { descriptions: string[]; descriptionTitle?: string }) {
  return (
    <DoDescriptionContainer>
      <DoDescriptionTitle>{props.descriptionTitle}</DoDescriptionTitle>
      {props.descriptions.map((description: string) => {
        return (
          <div key={description}>
            <span>{description}</span>
          </div>
        );
      })}
    </DoDescriptionContainer>
  );
}

const Container = styled.div({
  margin: '16px 0 0 16px'
});

interface Props {
  project: ProjectProps;
}

export function Project(props: Props) {
  const { project } = props;

  return (
    <Container>
      <ProjectInfo title={project.name} description={project.description} period={project.period} urls={project.urls} />
      <DoDescription descriptions={project.whatIdo} descriptionTitle={project.whatIdoTitle} />
      {props.project.skills.map((skill: string) => {
        return <SkillShield key={skill}>{skill}</SkillShield>;
      })}
    </Container>
  );
}
