import AbstractHandler from 'nightingale-handler';
import formatterMarkdown from 'nightingale-markdown-formatter';
import slackOutput from 'nightingale-slack-output';

export default class SlackHandler extends AbstractHandler {
    constructor(slackConfig: Object, minLevel) {
        super(minLevel, formatterMarkdown, slackOutput(slackConfig));
    }
}
