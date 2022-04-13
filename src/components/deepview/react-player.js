import ReactPlayer from 'react-player';

const Video = (props) => {
    return (
        <>
            
            <div className='cctvplayer'>
                <ReactPlayer
                    className='react-player'
                    url={'https://youtu.be/6CIwtIPqHJw'}    // 플레이어 url
                    height='100%'
                    width='100%'
                    controls={true}       // 플레이어 컨트롤 노출 여부
                    light={false}         // 플레이어 모드
                    pip={true}            // pip 모드 설정 여부
                    poster={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'}   // 플레이어 초기 포스터 사진
                    
                />
            </div>
        </>
    )
}

export default Video;