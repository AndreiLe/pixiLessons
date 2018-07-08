import {sum} from 'CLIENT/scenes/sum';

describe('LessonsScene12',()=>{
  it('adds 1 + 2 to equal 3', () => {
    expect(sum(1,2)).to.eql(3);
  });
});

