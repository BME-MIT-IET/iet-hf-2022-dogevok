'use strict';

const assert = require('assert');
const fs = require('fs');
const p = require('path');
const Url = require('../url.min.js');

function sanitizeURL (url) {
    var u = new Url(url, true);

    if (u.query['reload']) {
        delete u.query['reload']
    }

    if (u.query['forceReload']) {
        delete u.query['forceReload']
    }

    if (u.query['device']) {
        delete u.query['device']
    }

    if (u.query['testwebid']) {
        delete u.query['testwebid']
    }

    if (u.query['testWebId']) {
        delete u.query['testWebId']
    }

    if (u.query['testWebID']) {
        delete u.query['testWebID']
    }

    if (u.query['timetravel']) {
        delete u.query['timetravel']
    }

    return u.toString();
}

describe('Url()', function () {
    it('should construct an oobject', function () {
        const u = new Url();
        assert.equal(u instanceof Url, true);
    });
    it('should match current dir when construct with no argument', function () {
        const u = new Url();
        let dir = u.path.replace(/\//g, p.sep);
        process.platform.match(/^win/) && (dir = dir.substr(1));
        assert.equal(dir, fs.realpathSync('.'));
    });
    it('should keep URL without transformations if requested', function () {
        assert.equal(
          sanitizeURL('/SearchResults?search=new&make=Buick&year=2016&forceReload=true'),
          '/SearchResults?search=new&make=Buick&year=2016'
        );
    });
    it('should test absolutize url', function () {
        const absoluteUrl = new Url('/foo');
        assert.equal(absoluteUrl.toString(), 'file:///foo');

        const noTransform = new Url('/foo', true);
        assert.equal(noTransform.toString(), '/foo');
    });
});

describe('Url.clearQuery()', function () {
    it('should remove all vars from query string', function () {
        const url = new Url('http://example.com/?a&a=&b=&c=&d=&e=&f=&g=&h#foo');
        url.clearQuery();
        assert.equal('http://example.com/#foo', url.toString());
    });
});

describe('Url.encode(), Url.decode()', function () {
    it('should correctly encode and decode query string params', function () {
        var url1 = new Url('http://localhost/?a=%3F').toString();
        var url2 = new Url('http://localhost/?a=%3f').toString();
        assert.equal(url1.toLowerCase(), url2.toLowerCase());
    });
});

describe('Url.queryLength()', function () {
    it('should correctly return correct query lengths', function () {
        let url = new Url('http://localhost/?a=%3F');
        let queryLength = url.queryLength();
        assert.equal(queryLength, 1);

        url = new Url('http://localhost/');
        queryLength = url.queryLength();
        assert.equal(queryLength, 0);

        url = new Url('http://localhost/?a=%3F&test=this&hello=world');
        queryLength = url.queryLength();
        assert.equal(queryLength, 3);
    });
});

describe('Url.query.toString()', function () {
    it('should maintain name for null values, and drop them for undefined values', function () {
        const originalStr = 'http://localhost/path?alice=123&bob=&carol'
        const u = new Url(originalStr);
        assert.equal(u.query['alice'], '123');
        assert.equal(u.query['bob'], '');
        assert.equal(u.query['carol'], null);
        assert.equal(u.query['dave'], undefined);
        assert.equal(u.toString(), originalStr);

        u.query['eve'] = null;
        assert.equal(u.toString(), originalStr + '&eve');
        u.query['eve'] = undefined;
        assert.equal(u.toString(), originalStr);

        u.query['frank'] = 'foo';
        assert.equal(u.toString(), originalStr + '&frank=foo');
        delete u.query.frank;
        assert.equal(u.toString(), originalStr);
    });

    it('should maintain name for null values in arrays, and skip undefined values', function () {
        const originalStr = 'http://localhost/?a&a&a';
        const u = new Url(originalStr);
        assert.equal(u.query.toString(), 'a&a&a');
        assert.equal(u.query.a instanceof Array, true);
        assert.equal(u.query.a[0], null);
        assert.equal(u.query.a[1], null);
        assert.equal(u.query.a[2], null);
        assert.equal(u.queryLength(), 1);
        assert.equal(u.toString(), originalStr);

        u.query.a[1] = undefined;
        assert.equal(u.toString(), 'http://localhost/?a&a');

        u.query.a[1] = 'foo';
        assert.equal(u.toString(), 'http://localhost/?a&a=foo&a');

        u.query.a[1] = undefined;
        assert.equal(u.toString(), 'http://localhost/?a&a');

        u.query.a[1] = null;
        assert.equal(u.toString(), originalStr);
    });
});

describe('Url props interface', function () {
    it('should parse all URL parts correctly', function () {
        const str = 'wss://user:pass@example.com:9999/some/path.html?foo=bar#anchor';
        const u = new Url(str);
        assert.equal(u.protocol, 'wss');
        assert.equal(u.user, 'user');
        assert.equal(u.pass, 'pass');
        assert.equal(u.host, 'example.com');
        assert.equal(u.port, '9999');
        assert.equal(u.path, '/some/path.html');
        assert.equal(u.query, 'foo=bar');
        assert.equal(u.query.foo, 'bar');
        assert.equal(u.hash, 'anchor');
        assert.equal(str, u.toString());
    });
});

describe('Path url encoding', function () {
    it('should correctly encode whitespace as %20', function () {
        const u = new Url('http://localhost/path with space');
        assert.equal(u.toString(),'http://localhost/path%20with%20space');
    });
    // TODO: Fix https://github.com/Mikhus/domurl/issues/49
    xit('should correctly encode Plus Sign (+) to %2b in path.', function () {
        const u = new Url('http://localhost/path+with+plus');
        assert.equal(u.toString(), 'http://localhost/path%2bwith%2bplus');
    });
    xit('should preserve Plus Sign (+) in path.', function () {
        const u = new Url('http://localhost/path+with+plus');
        assert.equal(u.toString(), 'http://localhost/path%2bwith%2bplus');
    });
});

describe('Stressz Teszt',function() {
    it('Hosszú input fogadása 1000', function () {
        let longString = "https://f6stdwfettugm34tsxo89ncgict8p8e/0/rouvrhhx1bp1jvon7nc68mpjx0f3hiaurztb373zofc68bpuz6/jdkostppybgqzbaoa8b3t2w9u13w0u44mdjins8umzou16dcmzchxv6br94dia71pgxhj61ry23o6l03236/09pdtvw2ygh267op94qubzk3qcq4lrhaqqlu1vo6m9viym9ivtb3b8b3ogxlls1hwmf08gr/qon6pj085p0fsxeu6d2k3kyaq17l8rjaarxzoddbrme8qhec516g6e8r57ftn4t75xxseuctzfjuyap10vbv1vjj3fl9kr7picaj3f2lmtn48r9a/gd0asq98igrqafj5mki4nzorprzwp0wqcz5xq/tt5i3btmvyzgseb8j49yqw64h8ae/7k3qq9i7urwl1nsgfor1orqj6odr/dvse2yuregvlsm112x2h/k/nuqr9vx/66y16wl38lyw3pba1gmg/xgafeyhvp17cyob5tblm6vul7i5ymp8gw1fsf1lrbczke2irdmco2kjibuiz4st1f3jbf70mkgm5xlsqq1ettfy96qsrp44ll84o083gp9u7d9vmbybabrq/ncgyjj59emrjfb9ma48m1m1kgij6phtqc4kvn4pf61hfoud9pdo1dmzh8sa/3wrjxwe0k0/uhn0ei4pfhmrci58/1vj0zr9iedlvvd/uqulctaiuhjd5cix4m7dexiqkbiptaps0hk8ujjaxmm85g7israd2fjn57dxddmpqhmrs9gczvaqogb1sr7tak0w7n2m/i9sp3zqy7qy34/5wcylhjjerb3vpik5qk/fc1/scgg7p82m01nzeulddr2k4tsseccxg1/q79xyxrqq1tnvpq/k4977xznaqaz2v75g7fcjdy14pmfd1zwlj6ox1hof4udtqfdhp4ykvxupogtplx2/8kkf8mdnufi/wv2n7183n46ksbpejwjm/";
        let uu = new Url(longString);
        assert.equal(uu.toString(), longString);
    });

    it('Hosszú input fogadása 10000', function () {
        let longString = "https://f/ztfcs79ca2jbdhgzpsxvbhkqiuddsnf8yzcs5ieukpucc3vogc9n44d0chlr6ohedrqn0ue1jekalct3dlcunz8zpom5s2rb268acix28xvhbd4q9cuuqllbuxqlt1ms9q9wd57z9qsb5ufaoop2//r632k4lrgja02a4ijb524x67rve8zx4fbkyrln9tl96k2/dpl0hb80r7zx9l75qg04efg6cwb92gtmttsg76j4unvgf2rkql5iw4sx9ucckoadnwkv3rjx/9rebzsch52zov05s/gb2ngn3truchzovy5e9mx1e61ohd8u91u68k1uq53dbtx4biqt265un01o15hspwlqvy34aa84i8xbrgxpzhwlrifbceg0t/ouoccu1ns0vudo2dndpmj6hwsolu/p05zn1qe7zy5o4ssbjopgo2p062zr18xkvgtcgwb9a0f2egrf2ag7bqtawnhw66q4d9/vgk6jhgxqsv7q60hacgd1z4usk4ihqztf6s/vmcr7fmyibkd/ldlh5bs9freb/ab170dur12qyl7y9fycqj4/jeh170sgl8ua92nmsfuj358o6sygp4607n54/zeaq/4z5jcty8qgjee0q4doi9om4eeknp74aa/uyreal8ui1bnfk335z7nhjvcpwz125xuug5gljgts7qrohfuo2cwsya0i/73cqjt3uksq6vw0q4ezjarsq9blafoum//c3umu8vuyeluflp26x5vkr/kc/sl2lfg/fg7eoliy2gk27253irh0bxuhrpcujwiyps/2x9tcdw659uslf8ztavkl1l80j9lrkkft44pefnfeb/fmekybdcyl1qc87gle2hlzc3wi1dcpa/811si7ewdmq15p2vhatssfitxruy0d4fg5ndoapl323vyggu3e2c18lt9q2ipopfx5x4szpl1r82zobudbi7eaauiqdl6z7wx5k0dlh6ihl/pf/5neo4dr38wioot/f/ztfcs79ca2jbdhgzpsxvbhkqiuddsnf8yzcs5ieukpucc3vogc9n44d0chlr6ohedrqn0ue1jekalct3dlcunz8zpom5s2rb268acix28xvhbd4q9cuuqllbuxqlt1ms9q9wd57z9qsb5ufaoop2//r632k4lrgja02a4ijb524x67rve8zx4fbkyrln9tl96k2/dpl0hb80r7zx9l75qg04efg6cwb92gtmttsg76j4unvgf2rkql5iw4sx9ucckoadnwkv3rjx/9rebzsch52zov05s/gb2ngn3truchzovy5e9mx1e61ohd8u91u68k1uq53dbtx4biqt265un01o15hspwlqvy34aa84i8xbrgxpzhwlrifbceg0t/ouoccu1ns0vudo2dndpmj6hwsolu/p05zn1qe7zy5o4ssbjopgo2p062zr18xkvgtcgwb9a0f2egrf2ag7bqtawnhw66q4d9/vgk6jhgxqsv7q60hacgd1z4usk4ihqztf6s/vmcr7fmyibkd/ldlh5bs9freb/ab170dur12qyl7y9fycqj4/jeh170sgl8ua92nmsfuj358o6sygp4607n54/zeaq/4z5jcty8qgjee0q4doi9om4eeknp74aa/uyreal8ui1bnfk335z7nhjvcpwz125xuug5gljgts7qrohfuo2cwsya0i/73cqjt3uksq6vw0q4ezjarsq9blafoum//c3umu8vuyeluflp26x5vkr/kc/sl2lfg/fg7eoliy2gk27253irh0bxuhrpcujwiyps/2x9tcdw659uslf8ztavkl1l80j9lrkkft44pefnfeb/fmekybdcyl1qc87gle2hlzc3wi1dcpa/811si7ewdmq15p2vhatssfitxruy0d4fg5ndoapl323vyggu3e2c18lt9q2ipopfx5x4szpl1r82zobudbi7eaauiqdl6z7wx5k0dlh6ihl/pf/5neo4dr38wioot/f/ztfcs79ca2jbdhgzpsxvbhkqiuddsnf8yzcs5ieukpucc3vogc9n44d0chlr6ohedrqn0ue1jekalct3dlcunz8zpom5s2rb268acix28xvhbd4q9cuuqllbuxqlt1ms9q9wd57z9qsb5ufaoop2//r632k4lrgja02a4ijb524x67rve8zx4fbkyrln9tl96k2/dpl0hb80r7zx9l75qg04efg6cwb92gtmttsg76j4unvgf2rkql5iw4sx9ucckoadnwkv3rjx/9rebzsch52zov05s/gb2ngn3truchzovy5e9mx1e61ohd8u91u68k1uq53dbtx4biqt265un01o15hspwlqvy34aa84i8xbrgxpzhwlrifbceg0t/ouoccu1ns0vudo2dndpmj6hwsolu/p05zn1qe7zy5o4ssbjopgo2p062zr18xkvgtcgwb9a0f2egrf2ag7bqtawnhw66q4d9/vgk6jhgxqsv7q60hacgd1z4usk4ihqztf6s/vmcr7fmyibkd/ldlh5bs9freb/ab170dur12qyl7y9fycqj4/jeh170sgl8ua92nmsfuj358o6sygp4607n54/zeaq/4z5jcty8qgjee0q4doi9om4eeknp74aa/uyreal8ui1bnfk335z7nhjvcpwz125xuug5gljgts7qrohfuo2cwsya0i/73cqjt3uksq6vw0q4ezjarsq9blafoum//c3umu8vuyeluflp26x5vkr/kc/sl2lfg/fg7eoliy2gk27253irh0bxuhrpcujwiyps/2x9tcdw659uslf8ztavkl1l80j9lrkkft44pefnfeb/fmekybdcyl1qc87gle2hlzc3wi1dcpa/811si7ewdmq15p2vhatssfitxruy0d4fg5ndoapl323vyggu3e2c18lt9q2ipopfx5x4szpl1r82zobudbi7eaauiqdl6z7wx5k0dlh6ihl/pf/5neo4dr38wioot/f/ztfcs79ca2jbdhgzpsxvbhkqiuddsnf8yzcs5ieukpucc3vogc9n44d0chlr6ohedrqn0ue1jekalct3dlcunz8zpom5s2rb268acix28xvhbd4q9cuuqllbuxqlt1ms9q9wd57z9qsb5ufaoop2//r632k4lrgja02a4ijb524x67rve8zx4fbkyrln9tl96k2/dpl0hb80r7zx9l75qg04efg6cwb92gtmttsg76j4unvgf2rkql5iw4sx9ucckoadnwkv3rjx/9rebzsch52zov05s/gb2ngn3truchzovy5e9mx1e61ohd8u91u68k1uq53dbtx4biqt265un01o15hspwlqvy34aa84i8xbrgxpzhwlrifbceg0t/ouoccu1ns0vudo2dndpmj6hwsolu/p05zn1qe7zy5o4ssbjopgo2p062zr18xkvgtcgwb9a0f2egrf2ag7bqtawnhw66q4d9/vgk6jhgxqsv7q60hacgd1z4usk4ihqztf6s/vmcr7fmyibkd/ldlh5bs9freb/ab170dur12qyl7y9fycqj4/jeh170sgl8ua92nmsfuj358o6sygp4607n54/zeaq/4z5jcty8qgjee0q4doi9om4eeknp74aa/uyreal8ui1bnfk335z7nhjvcpwz125xuug5gljgts7qrohfuo2cwsya0i/73cqjt3uksq6vw0q4ezjarsq9blafoum//c3umu8vuyeluflp26x5vkr/kc/sl2lfg/fg7eoliy2gk27253irh0bxuhrpcujwiyps/2x9tcdw659uslf8ztavkl1l80j9lrkkft44pefnfeb/fmekybdcyl1qc87gle2hlzc3wi1dcpa/811si7ewdmq15p2vhatssfitxruy0d4fg5ndoapl323vyggu3e2c18lt9q2ipopfx5x4szpl1r82zobudbi7eaauiqdl6z7wx5k0dlh6ihl/pf/5neo4dr38wioot/f/ztfcs79ca2jbdhgzpsxvbhkqiuddsnf8yzcs5ieukpucc3vogc9n44d0chlr6ohedrqn0ue1jekalct3dlcunz8zpom5s2rb268acix28xvhbd4q9cuuqllbuxqlt1ms9q9wd57z9qsb5ufaoop2//r632k4lrgja02a4ijb524x67rve8zx4fbkyrln9tl96k2/dpl0hb80r7zx9l75qg04efg6cwb92gtmttsg76j4unvgf2rkql5iw4sx9ucckoadnwkv3rjx/9rebzsch52zov05s/gb2ngn3truchzovy5e9mx1e61ohd8u91u68k1uq53dbtx4biqt265un01o15hspwlqvy34aa84i8xbrgxpzhwlrifbceg0t/ouoccu1ns0vudo2dndpmj6hwsolu/p05zn1qe7zy5o4ssbjopgo2p062zr18xkvgtcgwb9a0f2egrf2ag7bqtawnhw66q4d9/vgk6jhgxqsv7q60hacgd1z4usk4ihqztf6s/vmcr7fmyibkd/ldlh5bs9freb/ab170dur12qyl7y9fycqj4/jeh170sgl8ua92nmsfuj358o6sygp4607n54/zeaq/4z5jcty8qgjee0q4doi9om4eeknp74aa/uyreal8ui1bnfk335z7nhjvcpwz125xuug5gljgts7qrohfuo2cwsya0i/73cqjt3uksq6vw0q4ezjarsq9blafoum//c3umu8vuyeluflp26x5vkr/kc/sl2lfg/fg7eoliy2gk27253irh0bxuhrpcujwiyps/2x9tcdw659uslf8ztavkl1l80j9lrkkft44pefnfeb/fmekybdcyl1qc87gle2hlzc3wi1dcpa/811si7ewdmq15p2vhatssfitxruy0d4fg5ndoapl323vyggu3e2c18lt9q2ipopfx5x4szpl1r82zobudbi7eaauiqdl6z7wx5k0dlh6ihl/pf/5neo4dr38wioot/f/ztfcs79ca2jbdhgzpsxvbhkqiuddsnf8yzcs5ieukpucc3vogc9n44d0chlr6ohedrqn0ue1jekalct3dlcunz8zpom5s2rb268acix28xvhbd4q9cuuqllbuxqlt1ms9q9wd57z9qsb5ufaoop2//r632k4lrgja02a4ijb524x67rve8zx4fbkyrln9tl96k2/dpl0hb80r7zx9l75qg04efg6cwb92gtmttsg76j4unvgf2rkql5iw4sx9ucckoadnwkv3rjx/9rebzsch52zov05s/gb2ngn3truchzovy5e9mx1e61ohd8u91u68k1uq53dbtx4biqt265un01o15hspwlqvy34aa84i8xbrgxpzhwlrifbceg0t/ouoccu1ns0vudo2dndpmj6hwsolu/p05zn1qe7zy5o4ssbjopgo2p062zr18xkvgtcgwb9a0f2egrf2ag7bqtawnhw66q4d9/vgk6jhgxqsv7q60hacgd1z4usk4ihqztf6s/vmcr7fmyibkd/ldlh5bs9freb/ab170dur12qyl7y9fycqj4/jeh170sgl8ua92nmsfuj358o6sygp4607n54/zeaq/4z5jcty8qgjee0q4doi9om4eeknp74aa/uyreal8ui1bnfk335z7nhjvcpwz125xuug5gljgts7qrohfuo2cwsya0i/73cqjt3uksq6vw0q4ezjarsq9blafoum//c3umu8vuyeluflp26x5vkr/kc/sl2lfg/fg7eoliy2gk27253irh0bxuhrpcujwiyps/2x9tcdw659uslf8ztavkl1l80j9lrkkft44pefnfeb/fmekybdcyl1qc87gle2hlzc3wi1dcpa/811si7ewdmq15p2vhatssfitxruy0d4fg5ndoapl323vyggu3e2c18lt9q2ipopfx5x4szpl1r82zobudbi7eaauiqdl6z7wx5k0dlh6ihl/pf/5neo4dr38wioot/f/ztfcs79ca2jbdhgzpsxvbhkqiuddsnf8yzcs5ieukpucc3vogc9n44d0chlr6ohedrqn0ue1jekalct3dlcunz8zpom5s2rb268acix28xvhbd4q9cuuqllbuxqlt1ms9q9wd57z9qsb5ufaoop2//r632k4lrgja02a4ijb524x67rve8zx4fbkyrln9tl96k2/dpl0hb80r7zx9l75qg04efg6cwb92gtmttsg76j4unvgf2rkql5iw4sx9ucckoadnwkv3rjx/9rebzsch52zov05s/gb2ngn3truchzovy5e9mx1e61ohd8u91u68k1uq53dbtx4biqt265un01o15hspwlqvy34aa84i8xbrgxpzhwlrifbceg0t/ouoccu1ns0vudo2dndpmj6hwsolu/p05zn1qe7zy5o4ssbjopgo2p062zr18xkvgtcgwb9a0f2egrf2ag7bqtawnhw66q4d9/vgk6jhgxqsv7q60hacgd1z4usk4ihqztf6s/vmcr7fmyibkd/ldlh5bs9freb/ab170dur12qyl7y9fycqj4/jeh170sgl8ua92nmsfuj358o6sygp4607n54/zeaq/4z5jcty8qgjee0q4doi9om4eeknp74aa/uyreal8ui1bnfk335z7nhjvcpwz125xuug5gljgts7qrohfuo2cwsya0i/73cqjt3uksq6vw0q4ezjarsq9blafoum//c3umu8vuyeluflp26x5vkr/kc/sl2lfg/fg7eoliy2gk27253irh0bxuhrpcujwiyps/2x9tcdw659uslf8ztavkl1l80j9lrkkft44pefnfeb/fmekybdcyl1qc87gle2hlzc3wi1dcpa/811si7ewdmq15p2vhatssfitxruy0d4fg5ndoapl323vyggu3e2c18lt9q2ipopfx5x4szpl1r82zobudbi7eaauiqdl6z7wx5k0dlh6ihl/pf/5neo4dr38wioot/f/ztfcs79ca2jbdhgzpsxvbhkqiuddsnf8yzcs5ieukpucc3vogc9n44d0chlr6ohedrqn0ue1jekalct3dlcunz8zpom5s2rb268acix28xvhbd4q9cuuqllbuxqlt1ms9q9wd57z9qsb5ufaoop2//r632k4lrgja02a4ijb524x67rve8zx4fbkyrln9tl96k2/dpl0hb80r7zx9l75qg04efg6cwb92gtmttsg76j4unvgf2rkql5iw4sx9ucckoadnwkv3rjx/9rebzsch52zov05s/gb2ngn3truchzovy5e9mx1e61ohd8u91u68k1uq53dbtx4biqt265un01o15hspwlqvy34aa84i8xbrgxpzhwlrifbceg0t/ouoccu1ns0vudo2dndpmj6hwsolu/p05zn1qe7zy5o4ssbjopgo2p062zr18xkvgtcgwb9a0f2egrf2ag7bqtawnhw66q4d9/vgk6jhgxqsv7q60hacgd1z4usk4ihqztf6s/vmcr7fmyibkd/ldlh5bs9freb/ab170dur12qyl7y9fycqj4/jeh170sgl8ua92nmsfuj358o6sygp4607n54/zeaq/4z5jcty8qgjee0q4doi9om4eeknp74aa/uyreal8ui1bnfk335z7nhjvcpwz125xuug5gljgts7qrohfuo2cwsya0i/73cqjt3uksq6vw0q4ezjarsq9blafoum//c3umu8vuyeluflp26x5vkr/kc/sl2lfg/fg7eoliy2gk27253irh0bxuhrpcujwiyps/2x9tcdw659uslf8ztavkl1l80j9lrkkft44pefnfeb/fmekybdcyl1qc87gle2hlzc3wi1dcpa/811si7ewdmq15p2vhatssfitxruy0d4fg5ndoapl323vyggu3e2c18lt9q2ipopfx5x4szpl1r82zobudbi7eaauiqdl6z7wx5k0dlh6ihl/pf/5neo4dr38wioot/f/ztfcs79ca2jbdhgzpsxvbhkqiuddsnf8yzcs5ieukpucc3vogc9n44d0chlr6ohedrqn0ue1jekalct3dlcunz8zpom5s2rb268acix28xvhbd4q9cuuqllbuxqlt1ms9q9wd57z9qsb5ufaoop2//r632k4lrgja02a4ijb524x67rve8zx4fbkyrln9tl96k2/dpl0hb80r7zx9l75qg04efg6cwb92gtmttsg76j4unvgf2rkql5iw4sx9ucckoadnwkv3rjx/9rebzsch52zov05s/gb2ngn3truchzovy5e9mx1e61ohd8u91u68k1uq53dbtx4biqt265un01o15hspwlqvy34aa84i8xbrgxpzhwlrifbceg0t/ouoccu1ns0vudo2dndpmj6hwsolu/p05zn1qe7zy5o4ssbjopgo2p062zr18xkvgtcgwb9a0f2egrf2ag7bqtawnhw66q4d9/vgk6jhgxqsv7q60hacgd1z4usk4ihqztf6s/vmcr7fmyibkd/ldlh5bs9freb/ab170dur12qyl7y9fycqj4/jeh170sgl8ua92nmsfuj358o6sygp4607n54/zeaq/4z5jcty8qgjee0q4doi9om4eeknp74aa/uyreal8ui1bnfk335z7nhjvcpwz125xuug5gljgts7qrohfuo2cwsya0i/73cqjt3uksq6vw0q4ezjarsq9blafoum//c3umu8vuyeluflp26x5vkr/kc/sl2lfg/fg7eoliy2gk27253irh0bxuhrpcujwiyps/2x9tcdw659uslf8ztavkl1l80j9lrkkft44pefnfeb/fmekybdcyl1qc87gle2hlzc3wi1dcpa/811si7ewdmq15p2vhatssfitxruy0d4fg5ndoapl323vyggu3e2c18lt9q2ipopfx5x4szpl1r82zobudbi7eaauiqdl6z7wx5k0dlh6ihl/pf/5neo4dr38wioot/f/ztfcs79ca2jbdhgzpsxvbhkqiuddsnf8yzcs5ieukpucc3vogc9n44d0chlr6ohedrqn0ue1jekalct3dlcunz8zpom5s2rb268acix28xvhbd4q9cuuqllbuxqlt1ms9q9wd57z9qsb5ufaoop2//r632k4lrgja02a4ijb524x67rve8zx4fbkyrln9tl96k2/dpl0hb80r7zx9l75qg04efg6cwb92gtmttsg76j4unvgf2rkql5iw4sx9ucckoadnwkv3rjx/9rebzsch52zov05s/gb2ngn3truchzovy5e9mx1e61ohd8u91u68k1uq53dbtx4biqt265un01o15hspwlqvy34aa84i8xbrgxpzhwlrifbceg0t/ouoccu1ns0vudo2dndpmj6hwsolu/p05zn1qe7zy5o4ssbjopgo2p062zr18xkvgtcgwb9a0f2egrf2ag7bqtawnhw66q4d9/vgk6jhgxqsv7q60hacgd1z4usk4ihqztf6s/vmcr7fmyibkd/ldlh5bs9freb/ab170dur12qyl7y9fycqj4/jeh170sgl8ua92nmsfuj358o6sygp4607n54/zeaq/4z5jcty8qgjee0q4doi9om4eeknp74aa/uyreal8ui1bnfk335z7nhjvcpwz125xuug5gljgts7qrohfuo2cwsya0i/73cqjt3uksq6vw0q4ezjarsq9blafoum//c3umu8vuyeluflp26x5vkr/kc/sl2lfg/fg7eoliy2gk27253irh0bxuhrpcujwiyps/2x9tcdw659uslf8ztavkl1l80j9lrkkft44pefnfeb/fmekybdcyl1qc87gle2hlzc3wi1dcpa/811si7ewdmq15p2vhatssfitxruy0d4fg5ndoapl323vyggu3e2c18lt9q2ipopfx5x4szpl1r82zobudbi7eaauiqdl6z7wx5k0dlh6ihl/pf/5neo4dr38wioot/";
        let u = new Url(longString);
        assert.equal(u.toString(), longString);
    });
});

describe('Stressz Teszt módosításra',function(){
    it('Sok URL módosítás', function(){
        let modPath="ztfcs79ca2jbdhgzpsxvbhkqiuddsnf8yzcs5ieukpucc3vogc9n44d0chlr6ohedrqn0ue1jekalct3dlcunz8zpom5s2rb268acix28xvhbd4q9cuuqllbuxqlt1ms9q9wd57z9qsb5ufaoop2ztfcs79ca2jbdhgzpsxvbhkqiuddsnf8yzcs5ieukpucc3vogc9n44d0chlr6ohedrqn0ue1jekalct3dlcunz8zpom5s2rb268acix28xvhbd4q9cuuqllbuxqlt1ms9q9wd57z9qsb5ufaoop2".split("");

        const basis= "https://eukpucc3vogc9n44d0chlr6ohedrqn0ue1jekalct3dlcunz8zpom5s2rb268acix28xvhbd4q9cuuqllbuxqlt1ms9q9wd57z9qs?q=";
        let url=new Url(basis)
        for(let i=0;i<modPath.length;++i){
            url.query.q=modPath[i];
        }
        let dest=new Url(basis+modPath[modPath.length-1]);
        assert.equal(url.toString(), dest.toString());
    });
    let longString = "ztfcs79ca2jbdhgzpsxvbhkqiuddsnf8yzcs5ieukpucc3vogc9n44d0chlr6ohedrqn0ue1jekalct3dlcunz8zpom5s2rb268acix28xvhbd4q9cuuqllbuxqlt1ms9q9wd57z9qsb5ufaoop2ztfcs79ca2jbdhgzpsxvbhkqiuddsnf8yzcs5ieukpucc3vogc9n44d0chlr6ohedrqn0ue1jekalct3dlcunz8zpom5s2rb268acix28xvhbd4q9cuuqllbuxqlt1ms9q9wd57z9qsb5ufaoop2";
    it('Encode - decode', function(){
        let url1 = new Url('https://localhost/?a='+longString).toString();
        let url2 = new Url('https://localhost/?a='+longString).toString();
        assert.equal(url1.toLowerCase(), url2.toLowerCase());
    });
    it('Hosszú query levágása',function(){
        let url_n = new Url('https://localhost/?a='+longString);
        url_n.clearQuery();
        assert.equal(url_n.toString(), 'https://localhost/');
    });
});

describe("Url.isEmptyQuery tesztje", function () {
    it ("Üres query esetén true-t ad vissza", function () {
        let url = new Url("https://github.com/BME-MIT-IET/iet-hf-2022-dogevok");
        assert(url.isEmptyQuery());
    });
    it ("Nem üres query esetén false-t ad vissza", function () {
        let url = new Url("https://github.com/BME-MIT-IET/iet-hf-2022-dogevok/a?b=2&c=4&d=5");
        assert(!url.isEmptyQuery());
    });
})
